import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { SidebarContext, SidebarUserProvider } from "../sidebarContext";
import { Detailedfoodlist } from "./Components/FoodCard";
import FoodScanner from "./Components/FoodScanner";
import LoadingScreen from "./Components/LoadingScreen";
import MealCard from "./Components/MealCard";
import RecipeSearch from "./Components/RecipeSearch";
import Sidebar from "./Components/Sidebar";
import UserInput from "./Components/UserInput";
import GroceriesPage from "./Pages/GroceriesPage";
import Home from "./Pages/Home";
import Login, { Login1, Login2 } from "./Pages/Login";
import LoginPage from "./Pages/LoginPage";
import MealPlanPage from "./Pages/MealPlanPage";
import Onboarding, {
  Onboard1,
  Onboard2,
  Onboard3,
  Onboard4,
} from "./Pages/Onboarding";
import OnboardPage from "./Pages/Onboardpage";
import { Recipe2, Recipe3 } from "./Pages/Recipe";
import RecipePage from "./Pages/RecipePage";
import Settings from "./Pages/Settings";

import { ThemeProvider } from "./theme.jsx";

const Stack = createNativeStackNavigator();

export default function Index() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <ThemeProvider>
      <SidebarUserProvider>
        <SidebarContext.Provider value={{ isSidebarOpen, openSidebar, closeSidebar }}>
          <>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: "fade",
                animationDuration: 200,
                gestureEnabled: true,
                gestureDirection: "horizontal",
                lazy: true,
                lazyPlaceholder: () => null,
                unmountOnBlur: false,
                transitionSpec: {
                  open: {
                    animation: 'timing',
                    config: { duration: 200 }
                  },
                  close: {
                    animation: 'timing',
                    config: { duration: 200 }
                  }
                }
              }}>
              <Stack.Screen name="Onboard" component={OnboardPage} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="LoginPage" component={LoginPage} />
              <Stack.Screen name="Groceries" component={GroceriesPage} />
              <Stack.Screen name="MealPlan" component={MealPlanPage} />
              <Stack.Screen name="Recipe" component={RecipePage} />
              <Stack.Screen name="Settings" component={Settings} />
             
              <Stack.Screen name="Onboard1" component={Onboard1} />
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="Onboard2" component={Onboard2} />
              <Stack.Screen name="Onboard3" component={Onboard3} />
              <Stack.Screen name="Onboard4" component={Onboard4} />
              <Stack.Screen name="Login1" component={Login1} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Login2" component={Login2} />
              <Stack.Screen name="Detailedfoodlist" component={Detailedfoodlist} />
              <Stack.Screen name="MealCard" component={MealCard} />
              <Stack.Screen name="Recipe2" component={Recipe2}/>
              <Stack.Screen name="Recipe3" component={Recipe3} />
              <Stack.Screen name="Sidebar" component={Sidebar} />
              <Stack.Screen name="UserInput" component={UserInput} />
              <Stack.Screen name="FoodScanner" component={FoodScanner} />
              <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
              <Stack.Screen name="RecipeSearch" component={RecipeSearch} />
            </Stack.Navigator>
            <Sidebar visible={isSidebarOpen} onClose={closeSidebar} />
          </>
        </SidebarContext.Provider>
      </SidebarUserProvider>
    </ThemeProvider>
  );
}