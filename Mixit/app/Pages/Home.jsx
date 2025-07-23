import React from "react";
import { Text, View } from "react-native";
import { useSidebar } from '../../sidebarContext';
import FoodCards, { FoodCard2 } from "../Components/FoodCard";
import ImportTab from "../Components/ImportTab";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import Sidebar from '../Components/Sidebar';
import { useTheme } from '../theme.jsx';

const Home = React.memo(() => {
  const { theme } = useTheme();
  const { isSidebarOpen, closeSidebar } = useSidebar();
  
  return (
    <View style={{ flex: 1, backgroundColor: theme.primaryBackground }}>
      <View className="mb-4">
        <Navbar />
      </View>

      <View className="mb-4">
        <Search searchType="food" />
      </View>
      <View>
        <FoodCards />
      </View>
      <View className="py-4 ">
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.primaryText, paddingHorizontal: 16 }}>Most Rated Recipes</Text>
      </View>

      <FoodCard2 />
      <View>
        <ImportTab currentPage="Home" />
      </View>
      <Sidebar visible={isSidebarOpen} onClose={closeSidebar} />
    </View>
  );
});

Home.displayName = "Home";

export default Home;
