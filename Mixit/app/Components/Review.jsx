import { Image as ExpoImage } from 'expo-image';
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useTheme } from '../theme.jsx';

const placeholderImage = require('../../assets/images/Logo.png');

const Review = ({text,image,name,ratings}) => {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (typeof image === 'string') ExpoImage.prefetch(image);
  }, [image]);
  
  // Determine image source: local or remote
  let imageSource = imageError
    ? placeholderImage
    : (typeof image === 'string' ? { uri: image } : image);

  return (
    <View style={{
      backgroundColor: theme.cardBackground,
      borderRadius: 16,
      padding: 20,
      width: 280,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 1,
      borderColor: theme.border,
    }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
        <ExpoImage
          source={imageError || !image ? placeholderImage : imageSource}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 12,
            borderWidth: 2,
            borderColor: theme.border,
          }}
          contentFit="cover"
          placeholder={placeholderImage}
          onLoadEnd={() => setLoading(false)}
          onError={() => { setImageError(true); setLoading(false); }}
          transition={300}
        />
        {loading && (
          <View style={{ position: 'absolute', left: 0, top: 0, width: 50, height: 50, backgroundColor: 'rgba(220,220,220,0.3)', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
            <ExpoImage source={placeholderImage} style={{ width: 12, height: 12, opacity: 0.5 }} contentFit="cover" />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "bold",
            color: theme.primaryText,
            marginBottom: 4,
          }}>
            {name}
          </Text>
          <Text style={{
            fontSize: 14,
            color: theme.primaryGreen,
            fontWeight: "600",
          }}>
            ⭐ {ratings}/5
          </Text>
        </View>
      </View>
      <Text style={{
        fontSize: 14,
        color: theme.secondaryText,
        lineHeight: 20,
        fontStyle: "italic",
      }}>
        "{text}"
      </Text>
    </View>
  );
};

export default Review;
