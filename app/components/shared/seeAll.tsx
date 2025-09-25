import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface SeeAllProps {
  title: string;
}

const SeeAll = ({ title }: SeeAllProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.seeAll}>See All</Text>
    </View>
  );
};

export default SeeAll;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
    width: "100%",
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
});
