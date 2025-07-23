import { useNavigation } from "@react-navigation/native";
// import { Video } from "expo-video";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../Components/Button";
import GetToKnowUs from "../Components/GetToKnowUs";
import Review from "../Components/Review";
import { useTheme } from '../theme.jsx';

const { width } = Dimensions.get("window");
const FRAME_WIDTH = width * 0.6;
const FRAME_HEIGHT = FRAME_WIDTH * 2;

const Onboarding = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      <View
        className="rounded-full overflow-hidden"
        style={{ width: "30%", aspectRatio: 1, alignSelf: "center" }}>
        <Image
          source={require("../../assets/images/Asset 4.png")}
          className="w-full h-full object-cover"
          resizeMode="contain"
        />
      </View>

      <View>
        <Text style={[styles.title, { color: theme.primaryText }]}>Welcome to Mixit</Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
        “Mixit is your smart kitchen companion  discover, mix, and
        master delicious recipes from around the world with ease. Whether you're a beginner or a pro,  Mixit helps you cook better, faster, and tastier every day!”
        </Text>
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={styles.container}>
          <Image
            style={styles.frame}
            resizeMode="contain"
            source={require("../../assets/images/Iphone.png")}
          />
        </View>
      </View>
      <Button
        title={"Get started"}
        onPress={() => navigation.navigate("Onboard1")}
      />
      <View className="mt-4 flex-row">
        <Text style={[styles.loginText, { color: theme.primaryText }]}>Already have an account?</Text>
        <TouchableOpacity
          className=""
          onPress={() => navigation.navigate("Login2")}>
          <Text style={[styles.loginLink, { color: theme.primaryGreen }]}> Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Second login page

export const Onboard1 = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const reviews = [
    {
      name: "Sarah J.",
      text: "Mixit made cooking so much easier! The recipes are simple and delicious.",
      rating: 5,
      image:"https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/GBAJWSUV3EI6RAML5G3TJDGYPU.jpg"
    },
    {
      name: "Mike T.",
      text: "I love the step-by-step guides. My family enjoys every meal I make now.",
      rating: 4,
      image:"https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/GBAJWSUV3EI6RAML5G3TJDGYPU.jpg"
    },
    {
      name: "Priya S.",
      text: "Great app for beginners and pros alike. Highly recommended!",
      rating: 5,
      image:"https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/GBAJWSUV3EI6RAML5G3TJDGYPU.jpg"
    },
    {
      name: "Carlos R.",
      text: "The grocery list feature saves me so much time. Thank you Mixit!",
      rating: 4,
      image:"https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/GBAJWSUV3EI6RAML5G3TJDGYPU.jpg"
    },
    {
      name: "Emily W.",
      text: "Beautiful design and easy to use. My go-to cooking app.",
      rating: 5,
      image:"https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/GBAJWSUV3EI6RAML5G3TJDGYPU.jpg"
    },
  ];
  const flatListRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % reviews.length;
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }, 2000); // Faster interval, but still smooth animation
    return () => clearInterval(interval);
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      {/* Loading Header */}
      <View>
        <View
          className="rounded-full overflow-hidden"
          style={{ width: "30%", aspectRatio: 1, alignSelf: "center" }}>
          <Image
            source={require("../../assets/images/Asset 4.png")}
            className="w-full h-full object-cover"
            resizeMode="contain"
          />
        </View>
        <View style={[styles.progressBar, { backgroundColor: theme.tertiaryBackground }]}>
          <View style={[styles.progressFill, { backgroundColor: theme.primaryGreen, width: '20%' }]} />
        </View>
      </View>

      {/* loading Header */}

      <View className="mt-10">
        <Text style={[styles.heading, { color: theme.primaryText }]}>
          WE HAVE HELPED 5+ MILLION COOKS
        </Text>
        <Text style={[styles.description, { color: theme.secondaryText }]}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          sapiente voluptatum. Blanditiis, numquam corporis exercitationem
        </Text>
      </View>

      <View style={{ height: 360, marginVertical: 20 }}>
        <FlatList
          ref={flatListRef}
          data={reviews}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            <Review name={item.name} text={item.text} ratings={item.rating} image={item.image} />
          )}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </View>
      <Button
        title={"Continue"}
        onPress={() => navigation.navigate("Onboard2")}
      />
    </View>
  );
};

// Third login page

export const Onboard2 = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const platforms = [
    {
      name: "YouTube",
      IconComponent: () => (
        <FontAwesome name="youtube-play" size={24} color="#FF0000" />
      ),
    },
    {
      name: "Instagram",
      IconComponent: () => (
        <FontAwesome name="instagram" size={24} color="#C13584" />
      ),
    },
    {
      name: "Google Search",
      IconComponent: () => (
        <FontAwesome name="google" size={24} color="#4285F4" />
      ),
    },
    {
      name: "TikTok",
      IconComponent: () => (
        <FontAwesome5 name="tiktok" size={24} color="#000000" />
      ),
    },
    {
      name: "Facebook",
      IconComponent: () => (
        <FontAwesome name="facebook" size={24} color="#1877F3" />
      ),
    },
    {
      name: "Other",
      IconComponent: null,
    },
  ];
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      {/* Header */}
      <View>
        <View
          className="rounded-full overflow-hidden"
          style={{ width: "30%", aspectRatio: 1, alignSelf: "center" }}>
          <Image
            source={require("../../assets/images/Asset 4.png")}
            className="w-full h-full object-cover"
            resizeMode="contain"
          />
        </View>
        <View style={[styles.progressBar, { backgroundColor: theme.tertiaryBackground }]}>
          <View style={[styles.progressFill, { backgroundColor: theme.primaryGreen, width: '36%' }]} />
        </View>
      </View>

      {/* page */}

      <View className="mt-10">
        <Text style={[styles.heading, { color: theme.primaryText }]}>
          how did you hear about us
        </Text>
      </View>

      {/* List */}
      <View style={{ marginTop: 24 }}>
        {platforms.map((item, id) => (
          <View key={id} style={{ marginBottom: 16 }}>
            <GetToKnowUs
              name={item.name}
              icon={item.IconComponent ? <item.IconComponent /> : null}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </View>
        ))}
      </View>
      <Button
        title={"Continue"}
        onPress={() => navigation.navigate("Onboard3")}
      />
    </View>
  );
};

// fourth login page
export const Onboard3 = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const platforms = [
    {
      name: "YouTube",
      IconComponent: () => (
        <FontAwesome name="youtube-play" size={24} color="#FF0000" />
      ),
    },
    {
      name: "Instagram",
      IconComponent: () => (
        <FontAwesome name="instagram" size={24} color="#C13584" />
      ),
    },
    {
      name: "Google Search",
      IconComponent: () => (
        <FontAwesome name="google" size={24} color="#4285F4" />
      ),
    },
    {
      name: "TikTok",
      IconComponent: () => (
        <FontAwesome5 name="tiktok" size={24} color="#000000" />
      ),
    },
    {
      name: "Facebook",
      IconComponent: () => (
        <FontAwesome name="facebook" size={24} color="#1877F3" />
      ),
    },
    {
      name: "Other",
      IconComponent: null,
    },
  ];
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      {/* Header */}
      <View>
        <View
          className="rounded-full overflow-hidden"
          style={{ width: "30%", aspectRatio: 1, alignSelf: "center" }}>
          <Image
            source={require("../../assets/images/Asset 4.png")}
            className="w-full h-full object-cover"
            resizeMode="contain"
          />
        </View>
        <View style={[styles.progressBar, { backgroundColor: theme.tertiaryBackground }]}>
          <View style={[styles.progressFill, { backgroundColor: theme.primaryGreen, width: '60%' }]} />
        </View>
      </View>

      {/* page */}

      <View className="mt-10">
        <Text style={[styles.heading, { color: theme.primaryText }]}>
          where do you get your
        </Text>
        <Text style={[styles.heading, { color: theme.primaryText }]}>
          recipes from
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>Select all to apply</Text>
      </View>

      {/* List */}
      <View style={{ marginTop: 24 }}>
        {platforms.map((item, id) => (
          <View key={id} style={{ marginBottom: 16 }}>
            <GetToKnowUs
              name={item.name}
              icon={item.IconComponent ? <item.IconComponent /> : null}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </View>
        ))}
      </View>
      <Button
        title={"Continue"}
        onPress={() => navigation.navigate("Onboard4")}
      />
    </View>
  );
};

// fourth login page

export const Onboard4 = () => {
  const [continueButtonVisible, setContinueButtonVisible] = useState(false);
  const spinValue = new Animated.Value(0);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const hasAnimated = useRef(false); // Track if animation has run

  useEffect(() => {
    if (hasAnimated.current) return; // Skip if already animated
    hasAnimated.current = true; // Mark as animated

    const animation = Animated.timing(spinValue, {
      toValue: 1,
      duration: 10000, // 2 seconds for faster animation
      useNativeDriver: true,
    });

    animation.start(() => {
      setContinueButtonVisible(true);
    });

    return () => {
      animation.stop(); // Clean up animation on unmount
    };
  }, []); // Empty dependency array ensures effect runs once on mount

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      {/* Header */}
      <View>
        <View
          className="rounded-full overflow-hidden"
          style={{ width: "30%", aspectRatio: 1, alignSelf: "center" }}>
          <Image
            source={require("../../assets/images/Asset 4.png")}
            className="w-full h-full object-cover"
            resizeMode="contain"
          />
        </View>
        <View style={[styles.progressBar, { backgroundColor: theme.tertiaryBackground }]}>
          <View style={[styles.progressFill, { backgroundColor: theme.primaryGreen, width: '100%' }]} />
        </View>
      </View>

      {/* Page */}
      <View className="mt-10">
        <Text style={[styles.heading, { color: theme.primaryText }]}>
          we are preparing features 
        </Text>
        <Text style={[styles.heading, { color: theme.secondaryText }]}> just for you</Text>
      </View>

      <Animated.View
        style={{
          transform: [
            {
              rotate: spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "36000deg"], // 3 full rotations
              }),
            },
          ],
        }}>
        <Image
          source={require("../../assets/images/Asset 4.png")}
          style={{ width: 300, height: 300 }}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Loading Text and Animation */}
      {!continueButtonVisible && (
        <View className="mt-5 flex-row items-center">
          <Text style={[styles.loadingText, { color: theme.primaryText }]}>
            Preparing features just for you
          </Text>
          <ActivityIndicator size="small" color={theme.primaryGreen} />
        </View>
      )}

      {continueButtonVisible && (
        <Button
          title="Continue"
          onPress={() => navigation.navigate("LoginPage")}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: '10%',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
  },
  loginText: {
    fontSize: 20,
  },
  loginLink: {
    fontSize: 20,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'capitalize',
    marginRight: 8,
  },
  progressBar: {
    width: 320,
    height: 12,
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 12,
  },
  progressFill: {
    height: 12,
    borderRadius: 30,
  },
  video: {
    position: "absolute",
    width: FRAME_WIDTH * 0.88,
    height: FRAME_HEIGHT * 0.92,
    top: FRAME_HEIGHT * 0.04,
    left: FRAME_WIDTH * 0.06,
    borderRadius: 24,
    backgroundColor: "#ffffff",
  },
  frame: {
    position: "absolute",
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
  },
});

export default Onboarding;