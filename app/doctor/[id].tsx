import { doctors } from "@/assets/data/doctors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DoctorDetail = () => {
  const { id } = useLocalSearchParams();
  const doctor = doctors.find((d) => d.id === parseInt(id as string));

  if (!doctor) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Doctor not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#64748B" />
        </TouchableOpacity>
        <View style={styles.profileImageContainer}>
          <Image source={doctor.image} style={styles.profileImage} />
        </View>
      </View>

      {/* Content Card */}
      <ScrollView
        style={styles.contentCard}
        showsVerticalScrollIndicator={false}
      >
        {/* Basic Information */}
        <View style={styles.basicInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialization}</Text>
          <Text style={styles.degrees}>{doctor.degrees}</Text>
          <Text style={styles.location}>{doctor.location}</Text>
        </View>

        {/* Statistics */}
        <View style={styles.statistics}>
          <View style={styles.statItem}>
            <Ionicons name="people" size={24} color="#333333" />
            <Text style={styles.statNumber}>{doctor.patients}</Text>
            <Text style={styles.statLabel}>Patients</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="briefcase" size={24} color="#333333" />
            <Text style={styles.statNumber}>{doctor.experience}</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="star" size={24} color="#333333" />
            <Text style={styles.statNumber}>{doctor.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="chatbubbles" size={24} color="#333333" />
            <Text style={styles.statNumber}>{doctor.reviews}+</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        {/* Fees Section */}
        <View style={styles.feesSection}>
          <View style={styles.feeItem}>
            <Text style={styles.feeLabel}>Consultation fee</Text>
            <Text style={styles.feeAmount}>{doctor.consultationFee}</Text>
            <Text style={styles.feeNote}>/ consultation</Text>
          </View>
          <View style={styles.feeItem}>
            <Text style={styles.feeLabel}>Follow-up fee</Text>
            <Text style={styles.feeAmount}>{doctor.followUpFee}</Text>
            <Text style={styles.feeNote}>(within 15 Days)</Text>
          </View>
        </View>

        {/* About Doctor */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About Doctor</Text>
          <Text style={styles.aboutText}>{doctor.about}</Text>
          <TouchableOpacity>
            <Text style={styles.readMore}>Read More</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Make Appointment Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.appointmentButton}>
          <Text style={styles.buttonText}>Make Appointments</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DoctorDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#20BEB8",
  },
  header: {
    height: 200,
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  profileImageContainer: {
    marginTop: 40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
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
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  contentCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  basicInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  doctorName: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#333333",
    marginBottom: 8,
  },
  specialty: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#666666",
    marginBottom: 4,
  },
  degrees: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#999999",
  },
  statistics: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#333333",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#666666",
  },
  feesSection: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  feeItem: {
    flex: 1,
    alignItems: "center",
  },
  feeLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#333333",
    marginBottom: 8,
  },
  feeAmount: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#333333",
    marginBottom: 4,
  },
  feeNote: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#999999",
  },
  aboutSection: {
    marginBottom: 100,
  },
  aboutTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#333333",
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#333333",
    lineHeight: 22,
    marginBottom: 8,
  },
  readMore: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#20BEB8",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  appointmentButton: {
    backgroundColor: "#20BEB8",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
});
