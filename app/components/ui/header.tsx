import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={{ width: 44, height: 44, borderRadius: 100 }}
          source={require("../../../assets/images/test.png")}
        />
        <View>
          <Text style={{ color: "#171717", fontFamily: "Poppins-Medium" }}>
            Hello!
          </Text>
          <Text style={{ fontFamily: "Poppins-SemiBold" }}>
            Zenifer Aniston
          </Text>
        </View>
      </View>
      <Ionicons name="notifications-outline" size={24} color="black" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
