import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from 'expo-blur';
import { Image as ExpoImage } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSidebarUser } from '../../sidebarContext';
import { useTheme } from '../theme.jsx';

const placeholderImage = require('../../assets/images/Logo.png');

const Sidebar = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const { profileImage, setProfileImage, name, setName, username, setUsername } = useSidebarUser();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (profileImage && typeof profileImage === 'string') ExpoImage.prefetch(profileImage);
  }, [profileImage]);
  const [showImagePicker, setShowImagePicker] = React.useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleNavigation = (route) => {
    onClose();
    setTimeout(() => navigation.navigate(route), 200);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setProfileImage(result.assets[0].uri);
      setShowImagePicker(false);
    }
  };

  if (!visible) return null;

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      flexDirection: 'row',
    }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{ flex: 1, height: '100%' }}
      >
        <BlurView intensity={40} tint="dark" style={{ flex: 1, height: '100%' }} />
      </TouchableOpacity>
      <View style={{
        width: '55%',
        height: '100%',
        backgroundColor: theme.modalBackground,
        shadowColor: theme.shadow,
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
        paddingTop: 40,
        paddingHorizontal: 12,
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
      }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <View style={{ width: 60, height: 60, borderRadius: 30, overflow: 'hidden', marginBottom: 8, borderWidth: 2, borderColor: theme.primaryGreen }}>
            <ExpoImage source={error || !profileImage ? placeholderImage : { uri: profileImage }} style={{ width: '100%', height: '100%' }} contentFit="cover" placeholder={placeholderImage} onLoadEnd={() => setLoading(false)} onError={() => { setError(true); setLoading(false); }} transition={300} />
            {loading && (
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(220,220,220,0.3)', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}>
                <ExpoImage source={placeholderImage} style={{ width: 12, height: 12, opacity: 0.5 }} contentFit="cover" />
              </View>
            )}
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: theme.primaryText }}>{username}</Text>
          <Text style={{ color: theme.secondaryText, fontSize: 14 }}>{name}</Text>
          <TouchableOpacity style={{ marginTop: 4 }} onPress={() => setShowEditProfile(true)}>
            <Text style={{ color: theme.primaryGreen, fontSize: 13, textDecorationLine: 'underline' }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        {showImagePicker && (
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
          }}>
            <View style={{ backgroundColor: theme.modalBackground, borderRadius: 16, padding: 24, alignItems: 'center', width: 280 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: theme.primaryText, marginBottom: 16 }}>Change Profile Picture</Text>
              <TouchableOpacity
                style={{ backgroundColor: theme.primaryGreen, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24, marginBottom: 12 }}
                onPress={pickImage}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: 8 }}
                onPress={() => setShowImagePicker(false)}
              >
                <Text style={{ color: theme.secondaryText, fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={{ gap: 12 }}>
          {/* <TouchableOpacity
            onPress={() => { onClose(); navigation.navigate('Upgrade'); }}
            style={{
              flexDirection: 'row', alignItems: 'center', backgroundColor: theme.cardBackground, borderRadius: 14, paddingVertical: 16, paddingHorizontal: 16, marginBottom: 0, shadowColor: theme.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: theme.border, width: '100%',
            }}
          >
            <View style={{ marginRight: 16 }}><MaterialIcons name="workspace-premium" size={32} color={theme.primaryGreen} /></View>
            <Text style={{ fontSize: 16, color: theme.primaryText, fontWeight: '500', flex: 1 }}>Upgrade to MixIt Plus</Text>
            <Ionicons name="chevron-forward" size={22} color={theme.tertiaryText} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { onClose(); navigation.navigate('Shortcut'); }}
            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.cardBackground, borderRadius: 14, paddingVertical: 16, paddingHorizontal: 16, marginBottom: 0, shadowColor: theme.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: theme.border, width: '100%' }}
          >
            <View style={{ marginRight: 16 }}><Ionicons name="add-circle-outline" size={32} color={theme.primaryGreen} /></View>
            <Text style={{ fontSize: 16, color: theme.primaryText, fontWeight: '500', flex: 1 }}>Add the MixIt Shortcut</Text>
            <Ionicons name="chevron-forward" size={22} color={theme.tertiaryText} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { onClose(); navigation.navigate('ImportGuides'); }}
            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.cardBackground, borderRadius: 14, paddingVertical: 16, paddingHorizontal: 16, marginBottom: 0, shadowColor: theme.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: theme.border, width: '100%' }}
          >
            <View style={{ marginRight: 16 }}><Ionicons name="book-outline" size={32} color={theme.primaryGreen} /></View>
            <Text style={{ fontSize: 16, color: theme.primaryText, fontWeight: '500', flex: 1 }}>Read our import guides</Text>
            <Ionicons name="chevron-forward" size={22} color={theme.tertiaryText} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { onClose(); navigation.navigate('Desktop'); }}
            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.cardBackground, borderRadius: 14, paddingVertical: 16, paddingHorizontal: 16, marginBottom: 0, shadowColor: theme.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: theme.border, width: '100%' }}
          >
            <View style={{ marginRight: 16 }}><Ionicons name="desktop-outline" size={32} color={theme.primaryGreen} /></View>
            <Text style={{ fontSize: 16, color: theme.primaryText, fontWeight: '500', flex: 1 }}>Use MixIt on Desktop</Text>
            <Ionicons name="chevron-forward" size={22} color={theme.tertiaryText} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { onClose(); navigation.navigate('Invite'); }}
            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.cardBackground, borderRadius: 14, paddingVertical: 16, paddingHorizontal: 16, marginBottom: 0, shadowColor: theme.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: theme.border, width: '100%' }}
          >
            <View style={{ marginRight: 16 }}><Ionicons name="person-add-outline" size={32} color={theme.primaryGreen} /></View>
            <Text style={{ fontSize: 16, color: theme.primaryText, fontWeight: '500', flex: 1 }}>Invite Friends</Text>
            <Ionicons name="chevron-forward" size={22} color={theme.tertiaryText} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { onClose(); navigation.navigate('Help'); }}
            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.cardBackground, borderRadius: 14, paddingVertical: 16, paddingHorizontal: 16, marginBottom: 0, shadowColor: theme.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: theme.border, width: '100%' }}
          >
            <View style={{ marginRight: 16 }}><Ionicons name="help-circle-outline" size={32} color={theme.primaryGreen} /></View>
            <Text style={{ fontSize: 16, color: theme.primaryText, fontWeight: '500', flex: 1 }}>Help</Text>
            <Ionicons name="chevron-forward" size={22} color={theme.tertiaryText} />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => setShowSettings(true)}
            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.cardBackground, borderRadius: 14, paddingVertical: 16, paddingHorizontal: 16, marginBottom: 0, shadowColor: theme.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: theme.border, width: '100%' }}
          >
            <View style={{ marginRight: 16 }}><Ionicons name="settings-outline" size={32} color={theme.primaryGreen} /></View>
            <Text style={{ fontSize: 16, color: theme.primaryText, fontWeight: '500', flex: 1 }}>Settings</Text>
            <Ionicons name="chevron-forward" size={22} color={theme.tertiaryText} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 16, right: 16 }}>
          <Ionicons name="close" size={28} color={theme.primaryText} />
        </TouchableOpacity>
      </View>
      {/* Settings Modal Popup (global overlay) */}
      <Modal
        visible={showSettings}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSettings(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{
            width: '90%',
            maxHeight: '90%',
            backgroundColor: theme.primaryBackground,
            borderRadius: 24,
            overflow: 'hidden',
            elevation: 20,
          }}>
            <SettingsModalContent onClose={() => setShowSettings(false)} />
          </View>
        </View>
      </Modal>
      {/* Edit Profile Modal */}
      <Modal
        visible={showEditProfile}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEditProfile(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{
            width: '90%',
            maxHeight: '90%',
            backgroundColor: theme.primaryBackground,
            borderRadius: 24,
            overflow: 'hidden',
            elevation: 20,
          }}>
            <EditProfileModalContent onClose={() => setShowEditProfile(false)} profileImage={profileImage} setProfileImage={setProfileImage} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Settings Modal Content (copy of Settings page, but with a close button)
const SettingsModalContent = ({ onClose }) => {
  const { theme } = useTheme();
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  return (
    <>
      <View style={{ backgroundColor: theme.primaryBackground, paddingTop: 40, width: '100%', height: '100%', paddingBottom: 24 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32, paddingHorizontal: 16 }}>
          <TouchableOpacity onPress={onClose} style={{ marginRight: 12 }}>
            <Ionicons name="arrow-back" size={22} color={theme.primaryText} style={{ fontWeight: 'bold' }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.primaryText }}>Settings</Text>
        </View>
        {/* Settings Options */}
        <View style={{ marginBottom: 32 }}>
          <TouchableOpacity 
            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 16 }}
            onPress={() => setShowAccountSettings(true)}
          >
            <Ionicons name="settings-outline" size={22} color={theme.primaryText} style={{ marginRight: 16 }} />
            <Text style={{ fontSize: 16, color: theme.primaryText }}>Account Settings</Text>
          </TouchableOpacity>
          <View style={{ height: 1, backgroundColor: theme.borderLight, marginHorizontal: 16 }} />
          {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 16 }}>
            <Ionicons name="settings-outline" size={22} color={theme.primaryText} style={{ marginRight: 16 }} />
            <Text style={{ fontSize: 16, color: theme.primaryText }}>My Subscription</Text>
          </TouchableOpacity>
          <View style={{ height: 1, backgroundColor: theme.borderLight, marginHorizontal: 16 }} />
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 16 }}>
            <Ionicons name="settings-outline" size={22} color={theme.primaryText} style={{ marginRight: 16 }} />
            <Text style={{ fontSize: 16, color: theme.primaryText }}>Help</Text>
          </TouchableOpacity> */}
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
      {/* Account Settings Modal */}
      <Modal
        visible={showAccountSettings}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAccountSettings(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{
            width: '90%',
            maxHeight: '90%',
           
            backgroundColor: theme.primaryBackground,
            borderRadius: 24,
            overflow: 'hidden',
            elevation: 20,
          }}>
            <AccountSettingsModalContent onClose={() => setShowAccountSettings(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

// Delete Account Modal Content
const DeleteAccountModalContent = ({ onClose }) => {
  const { theme } = useTheme();
  return (
    <View style={{ backgroundColor: theme.primaryBackground, paddingTop: 40, width: '100%', paddingBottom: 24 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32, paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={onClose} style={{ marginRight: 12 }}>
          <Ionicons name="arrow-back" size={22} color={theme.primaryText} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.primaryText }}>Delete Account</Text>
      </View>
      {/* Warning Text */}
      <Text style={{ fontSize: 15, color: theme.primaryText, marginBottom: 32, paddingHorizontal: 16 }}>
        Are you sure you want to delete your Mixit account? All your account information, recipes and photos will be deleted permanently.
      </Text>
      {/* Delete Button */}
      <View style={{ alignItems: 'center', marginTop: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 12,
            alignItems: 'center',
            minWidth: 220,
            borderWidth: 2,
            borderColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textTransform: 'none' }}>
            i want to delete my account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Settings Modal Content (copy of Settings page, but with a close button)
const AccountSettingsModalContent = ({ onClose }) => {
  const { theme } = useTheme();
  const { username, name } = useSidebarUser();
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showEmailSignIn, setShowEmailSignIn] = useState(false);
  return (
    <>
      <View style={{ backgroundColor: theme.primaryBackground, paddingTop: 40, width: '100%', height: '100%', paddingBottom: 24 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32, paddingHorizontal: 16 }}>
          <TouchableOpacity onPress={onClose} style={{ marginRight: 12 }}>
            <Ionicons name="arrow-back" size={22} color={theme.primaryText} style={{ fontWeight: 'bold' }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.primaryText }}>Account Settings</Text>
        </View>
        {/* Account Details */}
        <View style={{ marginBottom: 24, paddingHorizontal: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: theme.primaryText, marginBottom: 8 }}>Account Details</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: theme.primaryText, marginBottom: 2 }}>{username}</Text>
          <Text style={{ fontSize: 13, color: theme.secondaryText }}>{name}</Text>
          <Text style={{ fontSize: 13, color: theme.secondaryText, marginTop: 6 }}>
            You are signed in as {username}
          </Text>
        </View>
        {/* Change to email sign-in */}
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, paddingHorizontal: 16 }}
          onPress={() => setShowEmailSignIn(true)}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: theme.primaryText }}>Change to email sign -in</Text>
          <Ionicons name="chevron-forward" size={22} color={theme.primaryText} />
        </TouchableOpacity>
        {/* Delete account */}
        <TouchableOpacity 
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, paddingHorizontal: 16 }}
          onPress={() => setShowDeleteAccount(true)}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: theme.error }}>Delete account</Text>
          <Ionicons name="chevron-forward" size={22} color={theme.error} />
        </TouchableOpacity>
      </View>
      {/* Change to Email Sign-in Modal */}
      <Modal
        visible={showEmailSignIn}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEmailSignIn(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{
            width: '90%',
            backgroundColor: theme.primaryBackground,
            borderRadius: 24,
            padding: 24,
            alignItems: 'center',
            elevation: 20,
          }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 24 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.primaryText, textAlign: 'center', flex: 1 }}>Connect your email</Text>
              <TouchableOpacity onPress={() => setShowEmailSignIn(false)}>
                <Ionicons name="close" size={24} color={theme.primaryText} />
              </TouchableOpacity>
            </View>
            {/* Email Input */}
            <TextInput
              placeholder="Email"
              placeholderTextColor={theme.inputPlaceholder}
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: theme.borderLight,
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
                backgroundColor: theme.inputBackground,
                color: theme.primaryText,
                fontSize: 16,
              }}
            />
            {/* Password Input */}
            <TextInput
              placeholder="Password"
              placeholderTextColor={theme.inputPlaceholder}
              secureTextEntry
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: theme.borderLight,
                borderRadius: 8,
                padding: 12,
                marginBottom: 24,
                backgroundColor: theme.inputBackground,
                color: theme.primaryText,
                fontSize: 16,
              }}
            />
            {/* Save Button */}
            <TouchableOpacity
              style={{
                width: '100%',
                backgroundColor: theme.primaryGreen,
                borderRadius: 14,
                paddingVertical: 10,
                alignItems: 'center',
                marginTop: 4,
              }}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Delete Account Modal */}
      <Modal
        visible={showDeleteAccount}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteAccount(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{
            width: '90%',
            maxHeight: '90%',
            backgroundColor: theme.primaryBackground,
            borderRadius: 24,
            overflow: 'hidden',
            elevation: 20,
          }}>
            <DeleteAccountModalContent onClose={() => setShowDeleteAccount(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

// Edit Profile Modal Content
const EditProfileModalContent = ({ onClose, profileImage, setProfileImage }) => {
  const { theme } = useTheme();
  const { name, setName, username, setUsername } = useSidebarUser();
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [usernameInput, setUsernameInput] = useState(username);
  const [nameInput, setNameInput] = useState(name);

  // Pick from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setProfileImage(result.assets[0].uri);
      setShowImageOptions(false);
    }
  };
  // Take photo
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setProfileImage(result.assets[0].uri);
      setShowImageOptions(false);
    }
  };

  return (
    <View style={{ backgroundColor: theme.primaryBackground, paddingTop: 40, width: '100%',height: '100%', paddingBottom: 24 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32, paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={onClose} style={{ marginRight: 12 }}>
          <Ionicons name="arrow-back" size={22} color={theme.primaryText} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.primaryText }}>Edit Profile</Text>
      </View>
      {/* Username */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 }}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: theme.primaryText }}>Your Username</Text>
          {editingUsername ? (
            <TextInput
              value={usernameInput}
              onChangeText={setUsernameInput}
              style={{ color: theme.secondaryText, fontSize: 14, borderBottomWidth: 1, borderColor: theme.primaryGreen, minWidth: 120 }}
              autoFocus
              onBlur={() => {
                setEditingUsername(false);
                setUsername(usernameInput);
              }}
              onSubmitEditing={() => {
                setEditingUsername(false);
                setUsername(usernameInput);
              }}
            />
          ) : (
            <Text style={{ color: theme.secondaryText, fontSize: 14 }}>{username}</Text>
          )}
        </View>
        <TouchableOpacity onPress={() => setEditingUsername(true)}>
          <Text style={{ color: theme.primaryGreen, fontWeight: 'bold', fontSize: 15 }}>Edit</Text>
        </TouchableOpacity>
      </View>
      {/* Name */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 }}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: theme.primaryText }}>Your name</Text>
          {editingName ? (
            <TextInput
              value={nameInput}
              onChangeText={setNameInput}
              style={{ color: theme.secondaryText, fontSize: 14, borderBottomWidth: 1, borderColor: theme.primaryGreen, minWidth: 120 }}
              autoFocus
              onBlur={() => {
                setEditingName(false);
                setName(nameInput);
              }}
              onSubmitEditing={() => {
                setEditingName(false);
                setName(nameInput);
              }}
            />
          ) : (
            <Text style={{ color: theme.secondaryText, fontSize: 14 }}>{name}</Text>
          )}
        </View>
        <TouchableOpacity onPress={() => setEditingName(true)}>
          <Text style={{ color: theme.primaryGreen, fontWeight: 'bold', fontSize: 15 }}>Edit</Text>
        </TouchableOpacity>
      </View>
      {/* Profile Photo */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 }}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: theme.primaryText }}>Profile Photo</Text>
          <View style={{ marginTop: 8 }}>
            <ExpoImage
              source={profileImage ? { uri: profileImage } : require('../../assets/images/Logo.png')}
              style={{ width: 60, height: 60, borderRadius: 12, borderWidth: 1, borderColor: theme.border, backgroundColor: theme.tertiaryBackground }}
              contentFit="cover"
              transition={300}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => setShowImageOptions(true)}>
          <Text style={{ color: theme.primaryGreen, fontWeight: 'bold', fontSize: 15 }}>Add</Text>
        </TouchableOpacity>
      </View>
      {/* Image Options Modal */}
      <Modal
        visible={showImageOptions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowImageOptions(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: theme.primaryBackground, borderRadius: 16, padding: 24, alignItems: 'center', width: 260 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: theme.primaryText, marginBottom: 16 }}>Change Profile Photo</Text>
            <TouchableOpacity
              style={{ backgroundColor: theme.primaryGreen, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24, marginBottom: 12, width: '100%', alignItems: 'center' }}
              onPress={pickImage}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: theme.primaryGreen, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24, marginBottom: 12, width: '100%', alignItems: 'center' }}
              onPress={takePhoto}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Use Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 8 }}
              onPress={() => setShowImageOptions(false)}
            >
              <Text style={{ color: theme.secondaryText, fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Sidebar;