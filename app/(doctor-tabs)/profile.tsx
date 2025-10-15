import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DoctorProfile() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Doctor Profile</Text>
          <Text style={styles.subtitle}>Coming Soon...</Text>
        </View>

        {/* Dev Tools */}
        <View style={styles.devSection}>
          <View style={styles.separator} />
          <Text style={styles.sectionTitle}>Testing</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={async () => {
              await AsyncStorage.setItem("@medicare_user_role", "patient");
              router.replace("/(tabs)");
            }}
          >
            <Ionicons name="swap-horizontal" size={20} color="#06B6D4" />
            <Text style={styles.menuText}>Switch to Patient</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={async () => {
              await AsyncStorage.clear();
              router.replace("/screens/auth/onboarding");
            }}
          >
            <Ionicons name="trash" size={20} color="#EF4444" />
            <Text style={styles.menuText}>Reset App</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    paddingVertical: 60,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
  },
  devSection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#9CA3AF",
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#1F2937",
  },
});
