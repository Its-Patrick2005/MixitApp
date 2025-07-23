import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from "react";

export const SidebarContext = createContext({
  isSidebarOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
});
export function useSidebar() {
  return useContext(SidebarContext);
}

export const SidebarUserContext = createContext({
  profileImage: null,
  setProfileImage: () => {},
  name: '',
  setName: () => {},
  username: '',
  setUsername: () => {},
});

export function SidebarUserProvider({ children }) {
  const [profileImage, setProfileImageState] = useState(null);
  const [name, setNameState] = useState('Martin Afful');
  const [username, setUsernameState] = useState('martinaafful2304992');

  useEffect(() => {
    (async () => {
      try {
        const uri = await AsyncStorage.getItem('profileImage');
        if (uri) setProfileImageState(uri);
        const storedName = await AsyncStorage.getItem('profileName');
        if (storedName) setNameState(storedName);
        const storedUsername = await AsyncStorage.getItem('profileUsername');
        if (storedUsername) setUsernameState(storedUsername);
      } catch (e) {}
    })();
  }, []);

  const setProfileImage = async (uri) => {
    setProfileImageState(uri);
    try {
      if (uri) {
        await AsyncStorage.setItem('profileImage', uri);
      } else {
        await AsyncStorage.removeItem('profileImage');
      }
    } catch (e) {}
  };

  const setName = async (newName) => {
    setNameState(newName);
    try {
      if (newName) {
        await AsyncStorage.setItem('profileName', newName);
      } else {
        await AsyncStorage.removeItem('profileName');
      }
    } catch (e) {}
  };

  const setUsername = async (newUsername) => {
    setUsernameState(newUsername);
    try {
      if (newUsername) {
        await AsyncStorage.setItem('profileUsername', newUsername);
      } else {
        await AsyncStorage.removeItem('profileUsername');
      }
    } catch (e) {}
  };

  return (
    <SidebarUserContext.Provider value={{ profileImage, setProfileImage, name, setName, username, setUsername }}>
      {children}
    </SidebarUserContext.Provider>
  );
}

export function useSidebarUser() {
  return useContext(SidebarUserContext);
}

// Dummy component for router default export
const SidebarContextComponent = () => null;
export default SidebarContextComponent; 