import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RecordsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>სამედიცინო ჩანაწერები</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="document-text" size={30} color="#007AFF" />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>ჩანაწერები</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="calendar" size={30} color="#34C759" />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>ვიზიტები</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="analytics" size={30} color="#FF9500" />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>ანალიზები</Text>
          </View>
        </View>

        <View style={styles.placeholderCard}>
          <Ionicons name="document-text-outline" size={80} color="#C7C7CC" />
          <Text style={styles.placeholderText}>ჯერ არ არის ჩანაწერები</Text>
          <Text style={styles.placeholderSubtext}>
            დაამატეთ პირველი სამედიცინო ჩანაწერი
          </Text>
          <TouchableOpacity style={styles.addRecordButton}>
            <Text style={styles.addRecordText}>ჩანაწერის დამატება</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 5,
    textAlign: "center",
  },
  placeholderCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  placeholderText: {
    fontSize: 20,
    color: "#8E8E93",
    marginTop: 20,
    fontWeight: "500",
  },
  placeholderSubtext: {
    fontSize: 16,
    color: "#C7C7CC",
    marginTop: 10,
    textAlign: "center",
    marginBottom: 30,
  },
  addRecordButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  addRecordText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
