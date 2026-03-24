import { removeToken } from "@/utils/secureStore";
import API from "./api";

const registerUser = async (userData: any) => {
    try {
        const response = await API.post("/users/register-user", userData)
        return response.data
    } catch (error) {
        console.log("Error while registering user", error);
    }
}

const loginUser = async (userData: any) => {
    try {
        const response = await API.post("/users/login-user", userData)
        return response.data
    } catch (error) {
        console.log("Error while logging in user", error);
    }
}

const logoutUser = async () => {
    try {
        const response = await API.post("/users/logout-user")
        await removeToken();
        return response.data
    } catch (error) {
        console.log("Error while logging out user", error);
    }
}

const getAllUserStaff = async () => {
    try {
        const response = await API.get("/users/all-staff")
        return response.data
    } catch (error) {
        console.log("Error while fetching all staff", error);
    }
}

const getAllUserMentor = async () => {
    try {
        const response = await API.get("/users/all-mentor")
        return response.data
    } catch (error) {
        console.log("Error while fetching all mentor", error);
    }
}

const getCurrentUser = async () => {
    try {
        const response = await API.get("/users/current-user")
        return response.data
    } catch (error) {
        console.log("Error while fetching current user", error);
    }
}

export { registerUser, loginUser, logoutUser, getAllUserStaff, getAllUserMentor, getCurrentUser };