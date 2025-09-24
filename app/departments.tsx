import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DepartmentsScreen = () => {
  const departments = [
    {
      name: "Neurology",
      icon: "brain",
      description: "Brain and nervous system specialists",
    },
    {
      name: "Cardiology",
      icon: "brain",
      description: "Heart and cardiovascular specialists",
    },
    {
      name: "Gynecology",
      icon: "brain",
      description: "Women's health specialists",
    },
    {
      name: "Pediatrics",
      icon: "brain",
      description: "Children's health specialists",
    },
    {
      name: "Allergy",
      icon: "brain",
      description: "Allergy and immunology specialists",
    },
    { name: "Dentist", icon: "brain", description: "Dental care specialists" },
    {
      name: "Urology",
      icon: "brain",
      description: "Urinary system specialists",
    },
    {
      name: "Gastrology",
      icon: "brain",
      description: "Digestive system specialists",
    },
    {
      name: "Dermatology",
      icon: "brain",
      description: "Skin care specialists",
    },
    {
      name: "Orthopedics",
      icon: "brain",
      description: "Bone and joint specialists",
    },
    {
      name: "Ophthalmology",
      icon: "brain",
      description: "Eye care specialists",
    },
    {
      name: "Psychiatry",
      icon: "brain",
      description: "Mental health specialists",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Departments</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.grid}>
          {departments.map((dept, index) => (
            <TouchableOpacity key={index} style={styles.departmentCard}>
              <View style={styles.iconContainer}>
                <Ionicons name={dept.icon as any} size={40} color="#007AFF" />
              </View>
              <Text style={styles.departmentName}>{dept.name}</Text>
              <Text style={styles.departmentDescription}>
                {dept.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  departmentCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  departmentName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 4,
  },
  departmentDescription: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#666666",
    textAlign: "center",
    lineHeight: 16,
  },
});

export default DepartmentsScreen;
