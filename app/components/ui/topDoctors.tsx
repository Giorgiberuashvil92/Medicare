import { useFavorites } from "@/app/contexts/FavoritesContext";
import { doctors } from "@/assets/data/doctors";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DoctorFilters from "../shared/doctorFilters";
import SeeAll from "../shared/seeAll";

const TopDoctors = () => {
  const [selectedFilter, setSelectedFilter] = useState(1);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const filteredDoctors = useMemo(() => {
    if (selectedFilter === 1) {
      return doctors;
    } else {
      // Filter by specialization
      const filterMap: { [key: number]: string } = {
        2: "Neurology",
        3: "Cardiology",
        4: "Gynecology",
        5: "Pediatrics",
        6: "Allergy",
        7: "Dentist",
        8: "Urology",
        9: "Gastrology",
      };

      const filterSpecialization = filterMap[selectedFilter];
      return doctors.filter((doctor) =>
        doctor.specialization
          .toLowerCase()
          .includes(filterSpecialization.toLowerCase())
      );
    }
  }, [selectedFilter]);

  const handleToggleFavorite = (doctor: any, e: any) => {
    e.stopPropagation();
    if (isFavorite(doctor.id)) {
      // Show confirmation modal for removal
      setSelectedDoctor(doctor);
      setShowRemoveModal(true);
    } else {
      // Add to favorites directly
      toggleFavorite(doctor);
    }
  };

  const confirmRemoveFavorite = async () => {
    if (selectedDoctor) {
      await toggleFavorite(selectedDoctor);
      setShowRemoveModal(false);
      setSelectedDoctor(null);
    }
  };

  const cancelRemoveFavorite = () => {
    setShowRemoveModal(false);
    setSelectedDoctor(null);
  };

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
        onPress={() => router.push("/screens/doctors/topdoctors")}
      >
        <SeeAll title="Top Rated Doctors" />
      </TouchableOpacity>
      <DoctorFilters
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />
      <ScrollView
        style={styles.doctorList}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {filteredDoctors.map((doctor) => (
          <TouchableOpacity
            key={doctor.id}
            style={styles.doctorCard}
            onPress={() =>
              router.push({
                pathname: "/screens/doctors/doctor/[id]",
                params: { id: doctor.id.toString() },
              })
            }
          >
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
                  <Text style={styles.doctorReviews}>
                    ({doctor.reviewCount})
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={(e) => handleToggleFavorite(doctor, e)}
                >
                  <Ionicons
                    name={isFavorite(doctor.id) ? "heart" : "heart-outline"}
                    size={20}
                    color={isFavorite(doctor.id) ? "#EF4444" : "#D4D4D4"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Remove Confirmation Modal */}
      <Modal
        visible={showRemoveModal}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelRemoveFavorite}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHandle} />

            <Text style={styles.modalTitle}>Remove from Favourites?</Text>

            {selectedDoctor && (
              <View style={styles.doctorCardModal}>
                <View style={styles.doctorImageContainerModal}>
                  <Image
                    source={selectedDoctor.image}
                    style={styles.doctorImageModal}
                  />
                </View>

                <View style={styles.doctorInfoModal}>
                  <Text style={styles.doctorNameModal}>
                    {selectedDoctor.name}
                  </Text>
                  <Text style={styles.doctorSpecialtyModal}>
                    {selectedDoctor.specialization}
                  </Text>
                  <Text style={styles.doctorQualificationModal}>
                    {selectedDoctor.degrees || "MBBS, FCPS"}
                  </Text>
                  <View style={styles.doctorDetailsModal}>
                    <View style={styles.consultationFeeModal}>
                      <Text style={styles.consultationFeeTextModal}>
                        {selectedDoctor.consultationFee || "$100"}
                      </Text>
                    </View>
                    <View style={styles.ratingContainerModal}>
                      <Ionicons name="star" size={16} color="#F59E0B" />
                      <Text style={styles.ratingTextModal}>
                        {selectedDoctor.rating} (
                        {selectedDoctor.reviewCount ||
                          selectedDoctor.reviews ||
                          0}
                        )
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.favoriteIconModal}>
                  <Ionicons name="heart" size={20} color="#EF4444" />
                </View>
              </View>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={cancelRemoveFavorite}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={confirmRemoveFavorite}
              >
                <Text style={styles.removeButtonText}>Yes, remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    minHeight: 300,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 20,
  },
  doctorCardModal: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    alignItems: "center",
  },
  doctorImageContainerModal: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
    marginRight: 16,
    overflow: "hidden",
  },
  doctorImageModal: {
    width: "100%",
    height: "100%",
  },
  doctorInfoModal: {
    flex: 1,
  },
  doctorNameModal: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  doctorSpecialtyModal: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#6B7280",
    marginBottom: 2,
  },
  doctorQualificationModal: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#9CA3AF",
    marginBottom: 8,
  },
  doctorDetailsModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  consultationFeeModal: {
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  consultationFeeTextModal: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "#1F2937",
  },
  ratingContainerModal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingTextModal: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#6B7280",
  },
  favoriteIconModal: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#20BEB8",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#20BEB8",
  },
  removeButton: {
    flex: 1,
    backgroundColor: "#20BEB8",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  removeButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
});
