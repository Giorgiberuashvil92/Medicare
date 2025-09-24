import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Departments from "../components/ui/departments";
import Header from "../components/ui/header";
import Search from "../components/ui/search";
import Services from "../components/ui/services";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Header />
        <Search />
        <Services />
        <Departments />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
});
