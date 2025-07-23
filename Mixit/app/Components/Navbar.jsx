import { useNavigation } from "@react-navigation/native";
import { Image as ExpoImage } from 'expo-image';
import { useEffect, useRef, useState } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { useSidebar, useSidebarUser } from '../../sidebarContext';
import { useTheme } from '../theme.jsx';
const placeholderImage = require('../../assets/images/Logo.png');

const Navbar = ({ showNavbar = true }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { openSidebar } = useSidebar();
  const { profileImage } = useSidebarUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (profileImage && typeof profileImage === 'string') ExpoImage.prefetch(profileImage);
  }, [profileImage]);

  // Animation for slide and fade
  const animatedValue = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: showNavbar ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showNavbar]);

  return (
    <Animated.View
      style={{
        marginTop: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: theme.primaryBackground,
        opacity: animatedValue,
        transform: [
          {
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-80, 0], // Slide up when hidden
            }),
          },
        ],
      }}
    >
      {/* Touchable logo that navigates to Home */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{ 
          borderRadius: 50, 
          overflow: "hidden",
          width: "25%", 
          aspectRatio: 1, 
          alignSelf: "center" 
        }}
      >
        <ExpoImage
          source={require("../../assets/images/Asset 4.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Right profile image */}
      <TouchableOpacity
        onPress={openSidebar}
        style={{ 
          borderRadius: 50, 
          overflow: "hidden",
          width: "18%", 
          aspectRatio: 1, 
          alignSelf: "center",
          borderWidth: 3,
          borderColor: theme.primaryGreen,
          shadowColor: theme.primaryGreen,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 6,
          elevation: 6,
        }}
      >
        <ExpoImage
          source={error || !profileImage ? placeholderImage : { uri: profileImage }}
          style={{ width: "100%", height: "100%", borderRadius: 50 }}
          contentFit="cover"
          placeholder={placeholderImage}
          onLoadEnd={() => setLoading(false)}
          onError={() => { setError(true); setLoading(false); }}
          transition={300}
        />
        {loading && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(220,220,220,0.3)', justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
            <ExpoImage source={placeholderImage} style={{ width: 16, height: 16, opacity: 0.5 }} contentFit="cover" />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Navbar;
