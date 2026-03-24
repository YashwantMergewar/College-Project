import { Stack } from "expo-router";
import "../../global.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { View } from "react-native";
import Loader from "@/components/Loader";
import AppSplashScreen from "@/components/AppSplashScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

function RootNavigator() {
  const { user, loading } = useAuth();

  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash || (showSplash && loading)) {
    return <AppSplashScreen />;
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Loader />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!loading && user ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
