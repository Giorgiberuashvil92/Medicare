import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Departments = () => {
  const departments = [
    { name: "Neurology", icon: "../../../assets/images/icons/brain1.png" },
    { name: "Cardiology", icon: "../../../assets/images/icons/brain.svg" },
    { name: "Gynecology", icon: "../../../assets/images/icons/brain.svg" },
    { name: "Pediatrics", icon: "../../../assets/images/icons/brain.svg" },
    { name: "Allergy", icon: "../../../assets/images/icons/brain.svg" },
    { name: "Dentist", icon: "../../../assets/images/icons/brain.svg" },
    { name: "Urology", icon: "../../../assets/images/icons/brain.svg" },
    { name: "Gastrology", icon: "../../../assets/images/icons/brain.svg" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Departments</Text>
        <TouchableOpacity onPress={() => router.push("/departments")}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {departments.map((dept, index) => (
          <TouchableOpacity key={index} style={styles.departmentCard}>
            <View style={styles.iconContainer}>
              <Image
                source={{ uri: dept.icon }}
                placeholder={require("../../../assets/images/icons/brain.svg")}
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
            </View>
            <Text style={styles.departmentName}>{dept.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F2F2F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  seeAll: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#007AFF",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  departmentCard: {
    width: "23%",
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  departmentName: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#333333",
    textAlign: "center",
  },
});

export default Departments;
