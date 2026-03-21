import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: "#43008bff", tabBarInactiveTintColor: "#56505eff"}}>
     <Tabs.Screen name="index" options={{ 
        headerShown: false, 
        tabBarIcon: ({color, size, focused}) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
        )
     }} />
     <Tabs.Screen name="AdminLogin" options={{ 
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
        ) 
    }} />
    </Tabs>
  );
}
