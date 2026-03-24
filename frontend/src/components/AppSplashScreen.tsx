import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function AppSplashScreen() {
  // Animation values
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const ringScale = useRef(new Animated.Value(0.6)).current;
  const ringOpacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    // Pulsing ring animation (loops)
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(ringScale, { toValue: 1.35, duration: 1200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
          Animated.timing(ringOpacity, { toValue: 0, duration: 1200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(ringScale, { toValue: 0.6, duration: 0, useNativeDriver: true }),
          Animated.timing(ringOpacity, { toValue: 0.6, duration: 0, useNativeDriver: true }),
        ]),
      ])
    ).start();

    // Logo pop-in
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();

    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // Title slides up after logo
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(titleTranslateY, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
    ]).start();

    // Subtitle fades in last
    Animated.sequence([
      Animated.delay(700),
      Animated.timing(subtitleOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View
      className="flex-1 items-center justify-center bg-indigo-950"
    >
      {/* Background decorative circles */}
      <View
        className="absolute w-80 h-80 rounded-full bg-indigo-800/20"
        style={{ top: -60, left: -60 }}
      />
      <View
        className="absolute w-64 h-64 rounded-full bg-indigo-700/10"
        style={{ bottom: -40, right: -40 }}
      />

      {/* Pulsing ring behind logo */}
      <Animated.View
        style={{
          position: "absolute",
          width: 130,
          height: 130,
          borderRadius: 65,
          borderWidth: 2,
          borderColor: "rgba(129,140,248,0.5)",
          transform: [{ scale: ringScale }],
          opacity: ringOpacity,
        }}
      />

      {/* Logo icon */}
      <Animated.View
        style={{
          opacity: logoOpacity,
          transform: [{ scale: logoScale }],
        }}
        className="w-24 h-24 rounded-3xl bg-indigo-600 items-center justify-center"
      >
        <Ionicons name="school" size={48} color="white" />
      </Animated.View>

      {/* App name */}
      <Animated.Text
        style={{
          opacity: titleOpacity,
          transform: [{ translateY: titleTranslateY }],
          color: "#ffffff",
          fontSize: 32,
          fontWeight: "800",
          marginTop: 24,
          letterSpacing: 0.5,
        }}
      >
        College App
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text
        style={{
          opacity: subtitleOpacity,
          color: "#a5b4fc",
          fontSize: 14,
          marginTop: 8,
          letterSpacing: 1,
        }}
      >
        Manage • Connect • Grow
      </Animated.Text>

      {/* Bottom version label */}
      <Animated.Text
        style={{
          opacity: subtitleOpacity,
          color: "rgba(165,180,252,0.5)",
          fontSize: 11,
          position: "absolute",
          bottom: 36,
          letterSpacing: 0.5,
        }}
      >
        v1.0.0
      </Animated.Text>
    </View>
  );
}
