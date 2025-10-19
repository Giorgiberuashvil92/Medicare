import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";

export default function DoctorDashboard() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          გამარჯობა, {user?.name || 'ექიმო'}!
        </Text>
        <Text style={styles.subtitle}>
          ექიმის დაფა მალე იქნება მზად...
        </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            ელ-ფოსტა: {user?.email || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            როლი: {user?.role === 'doctor' ? 'ექიმი' : 'პაციენტი'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    flex: 1,
    justifyContent: "center",
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
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#374151",
    marginBottom: 8,
  },
});
