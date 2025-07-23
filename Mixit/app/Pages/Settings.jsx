import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme.jsx';

const Settings = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.primaryBackground, paddingTop: 40 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32, paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
          <Ionicons name="arrow-back" size={22} color={theme.primaryText} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.primaryText }}>Settings</Text>
      </View>

      {/* Settings Options */}
      <View style={{ marginBottom: 32 }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 16 }}>
          <Ionicons name="settings-outline" size={22} color={theme.primaryText} style={{ marginRight: 16 }} />
          <Text style={{ fontSize: 16, color: theme.primaryText }}>Account Settings</Text>
        </TouchableOpacity>
        <View style={{ height: 1, backgroundColor: theme.borderLight, marginHorizontal: 16 }} />
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 16 }}>
          <Ionicons name="settings-outline" size={22} color={theme.primaryText} style={{ marginRight: 16 }} />
          <Text style={{ fontSize: 16, color: theme.primaryText }}>My Subscription</Text>
        </TouchableOpacity>
        <View style={{ height: 1, backgroundColor: theme.borderLight, marginHorizontal: 16 }} />
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 16 }}>
          <Ionicons name="settings-outline" size={22} color={theme.primaryText} style={{ marginRight: 16 }} />
          <Text style={{ fontSize: 16, color: theme.primaryText }}>Help</Text>
        </TouchableOpacity>
        <View style={{ height: 1, backgroundColor: theme.borderLight, marginHorizontal: 16 }} />
      </View>

      {/* Log out button */}
      <View style={{ alignItems: 'center', marginTop: 32 }}>
        <TouchableOpacity
          style={{
            backgroundColor: theme.primaryGreen,
            paddingHorizontal: 32,
            paddingVertical: 10,
            borderRadius: 8,
            alignItems: 'center',
            minWidth: 100,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textTransform: 'lowercase' }}>log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;