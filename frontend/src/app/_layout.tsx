import { Stack } from "expo-router";
import "../../global.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { View } from "react-native";
import Loader from "@/components/Loader";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function RootNavigator() {
  const { user, loading } = useAuth();
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
