import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    id: 1,
    title: "Book Appointment",
    description: "For any health questions, our doctors are Ready to help you.",
  },
  {
    id: 2,
    title: "Online Health Check",
    description: "For any health questions, our doctors are Ready to help you.",
  },
  {
    id: 3,
    title: "2000+ Trusted Doctors",
    description: "For any health questions, our doctors are Ready to help you.",
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = async () => {
    await AsyncStorage.setItem("hasCompletedOnboarding", "true");
    router.replace("/(tabs)");
  };

  const currentData = onboardingData[currentIndex];
  const isLastScreen = currentIndex === onboardingData.length - 1;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Gradient Background */}
      <LinearGradient
        colors={["#8B5CF6", "#06B6D4"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Main Content */}
          <View style={styles.content}>
            {/* Glassmorphism Card with Button Cutout */}
            <View style={styles.cardContainer}>
              {/* Main Card */}
              <View style={styles.card}>
                <Text style={styles.title}>{currentData.title}</Text>
                <Text style={styles.description}>
                  {currentData.description}
                </Text>
              </View>

              {/* Button positioned in the cutout */}
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Ionicons
                  name={isLastScreen ? "checkmark" : "chevron-forward"}
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  time: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  signalIcon: {
    width: 18,
    height: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
  wifiIcon: {
    width: 16,
    height: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
  batteryIcon: {
    width: 24,
    height: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  cardContainer: {
    position: "relative",
    alignItems: "center",
    width: width * 0.9,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    padding: 30,
    paddingBottom: 50,
    width: "100%",
    backdropFilter: "blur(10px)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 38,
  },
  description: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.9,
  },
  nextButton: {
    position: "absolute",
    bottom: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#06B6D4",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    // Make button appear to be "inside" the card
    zIndex: 1,
  },
});
