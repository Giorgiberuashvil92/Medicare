import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        // Check if user has completed onboarding
        const hasCompletedOnboarding = await AsyncStorage.getItem(
          "hasCompletedOnboarding"
        );

        // Simulate loading time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsLoading(false);

        // Navigate based on onboarding status
        if (hasCompletedOnboarding === "true") {
          router.replace("/(tabs)");
        } else {
          router.replace("/screens/auth/onboarding");
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        setIsLoading(false);
        router.replace("/screens/auth/onboarding");
      }
    };

    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/splash-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Medicare</Text>
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});
