import { getCurrentUser, logoutUser } from "@/services/auth.service";
import { getAccessToken } from "@/utils/secureStore";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: string;
    fullname: string;
    username: string;
    email: string;
    role: "ADMIN" | "STAFF";
    isMentor: boolean;
}

type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    logout: () => Promise<any>;
    loadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = async () => {
        setLoading(true);
        try {
            const token = await getAccessToken()
            console.log("Token", token);
            
            if(!token){
                setUser(null);
                setLoading(false);
                return;
            }
            
            const res = await getCurrentUser();
            if(res.statusCode === 200){
                console.table("User", res.data || res.data.data);
                setUser(res.data || res.data.data);
            }
        } catch (error) {
            console.log("Error while loading user", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        setLoading(true);
        try {
            const res = await logoutUser();
            if(res && res.statusCode === 200){
                setUser(null);
                
            }
            return res;
        } catch (error) {
            console.log("Error while logging out user", error);
            return { statusCode: 500, success: false };
        } finally {
            setLoading(false);
        }
    }

    return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}