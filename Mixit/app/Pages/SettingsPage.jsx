import { Text, View } from 'react-native';
import { useTheme } from '../theme.jsx';

const SettingsPage = ({navigation}) => {
  const { theme } = useTheme();
  
  return (
    <View style={{ flex: 1, backgroundColor: theme.primaryBackground, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, color: theme.primaryText }}>SettingsPage</Text>
    </View>
  )
}

export default SettingsPage
