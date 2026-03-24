import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "#FFFFFF",
      tabBarInactiveTintColor: "rgba(255,255,255,0.4)",
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#1e1b4b",
        borderTopWidth: 0,
        borderRadius: 28,
        marginHorizontal: 16,
        marginBottom: 14,
        height: 64,
        paddingHorizontal: 8,
        paddingBottom: 0,
        paddingTop: 10,
        position: "absolute",
        elevation: 12,
        shadowColor: "#1e1b4b",
        shadowOpacity: 0.45,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 6 },
      }
      }}>
     <Tabs.Screen name="index" options={{
        title: "",
        headerShown: false, 
        tabBarIcon: ({color, size, focused}) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
        )
     }} />

     <Tabs.Screen name="staff/StaffDetails" options={{ 
        title: "",
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => (
            <Ionicons name={focused ? "people" : "people-outline"} size={size} color={color} />
        ) 
    }} />

     <Tabs.Screen name="mentor/MentorDetails" options={{ 
        title: "",
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => (
            <Ionicons name={focused ? "person-circle" : "person-circle-outline"} size={size} color={color} />
        ) 
    }} />

     <Tabs.Screen name="student/StudentDetails" options={{ 
        title: "",
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => (
            <Ionicons name={focused ? "school" : "school-outline"} size={size} color={color} />
        ) 
    }} />

    <Tabs.Screen name="profile" options={{ 
        title: "",
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
        ) 
    }} />
    </Tabs>
  );
}
