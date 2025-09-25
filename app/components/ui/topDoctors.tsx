import { doctors } from "@/assets/data/doctors";
import { Ionicons } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DoctorFilters from "../shared/doctorFilters";
import SeeAll from "../shared/seeAll";

const TopDoctors = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          justifyContent: "space-between",
          width: "100%",
        }}
        onPress={() => router.push("/topdoctors")}
      >
        <SeeAll title="Top Doctors" />
      </TouchableOpacity>
      <DoctorFilters />
      <ScrollView
        style={styles.doctorList}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {doctors.map((doctor) => (
          <TouchableOpacity key={doctor.id} style={styles.doctorCard}>
            <View style={styles.imageContainer}>
              <Image source={doctor.image} style={styles.doctorImage} />
              {doctor.isActive && (
                <View style={styles.activeIndicator}>
                  <Fontisto name="radio-btn-active" size={18} color="#22C55E" />
                </View>
              )}
            </View>
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialization}>
                {doctor.specialization}
              </Text>
              <View style={styles.ratingContainer}>
                <View style={styles.ratingLeft}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.doctorRating}>{doctor.rating}</Text>
                  <Text style={styles.doctorReviews}>({doctor.reviews})</Text>
                </View>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Ionicons name="heart-outline" size={20} color="#D4D4D4" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopDoctors;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F2F2F7",
  },
  doctorList: {
    marginTop: 16,
  },
  doctorCard: {
    width: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: "100%",
    height: 140,
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  doctorImage: {
    width: "100%",
    height: "100%",
  },
  doctorInfo: {
    padding: 16,
  },
  doctorName: {
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
    marginBottom: 4,
  },
  doctorSpecialization: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "#666666",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  doctorRating: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    color: "#333333",
  },
  doctorReviews: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    color: "#333333",
  },
  favoriteButton: {
    padding: 4,
  },
  activeIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});
