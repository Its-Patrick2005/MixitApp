import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { useTheme } from '../theme.jsx';

const { width, height } = Dimensions.get('window');

const LoadingScreen = ({ message = "Loading..." }) => {
  const { theme } = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animations
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );

    const fadeAnimation = Animated.timing(fadeValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    const scaleAnimation = Animated.timing(scaleValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    });

    Animated.parallel([
      spinAnimation,
      fadeAnimation,
      scaleAnimation,
    ]).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.primaryBackground,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    }}>
      {/* Logo with animation */}
      <Animated.View style={{
        opacity: fadeValue,
        transform: [
          { scale: scaleValue },
          { rotate: spin }
        ],
        marginBottom: 40,
      }}>
        <View style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: theme.lightGreen,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 4,
          borderColor: theme.primaryGreen,
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 12,
        }}>
          <Ionicons name="restaurant" size={60} color={theme.primaryGreen} />
        </View>
      </Animated.View>

      {/* App name */}
      <Animated.Text style={{
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.primaryText,
        marginBottom: 8,
        opacity: fadeValue,
      }}>
        Mixit
      </Animated.Text>

      {/* Subtitle */}
      <Animated.Text style={{
        fontSize: 16,
        color: theme.secondaryText,
        marginBottom: 40,
        textAlign: 'center',
        opacity: fadeValue,
      }}>
        Your Personal Recipe Companion
      </Animated.Text>

      {/* Loading message */}
      <Animated.Text style={{
        fontSize: 18,
        color: theme.primaryText,
        textAlign: 'center',
        marginBottom: 20,
        opacity: fadeValue,
      }}>
        {message}
      </Animated.Text>

      {/* Loading dots */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {[0, 1, 2].map((index) => (
          <Animated.View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: theme.primaryGreen,
              marginHorizontal: 4,
              opacity: fadeValue,
              transform: [{
                scale: scaleValue.interpolate({
                  inputRange: [0.8, 1],
                  outputRange: [0.5, 1],
                })
              }]
            }}
          />
        ))}
      </View>

      {/* Decorative elements */}
      <View style={{
        position: 'absolute',
        top: height * 0.2,
        right: width * 0.1,
        opacity: 0.1,
      }}>
        <Ionicons name="leaf" size={40} color={theme.primaryGreen} />
      </View>

      <View style={{
        position: 'absolute',
        bottom: height * 0.2,
        left: width * 0.1,
        opacity: 0.1,
      }}>
        <Ionicons name="heart" size={40} color={theme.primaryGreen} />
      </View>
    </View>
  );
};

export default LoadingScreen; 