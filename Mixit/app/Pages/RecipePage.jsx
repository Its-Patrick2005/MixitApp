import { useState } from 'react';
import { ScrollView, View } from "react-native";
import ImportTab from "../Components/ImportTab";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import { useTheme } from '../theme.jsx';
import Recipe from "./Recipe";

const RecipePage = ({ navigation }) => {
  const [cookbooks, setCookbooks] = useState([]);
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.primaryBackground }}>
      <Navbar />
      <View style={{ zIndex: 10, backgroundColor: theme.primaryBackground }}>
        <Search searchType="cookbooks" cookbooks={cookbooks} setCookbooks={setCookbooks} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
        <Recipe cookbooks={cookbooks} setCookbooks={setCookbooks} />
      </ScrollView>
      <ImportTab currentPage="Recipe" />
    </View>
  );
};

export default RecipePage;
