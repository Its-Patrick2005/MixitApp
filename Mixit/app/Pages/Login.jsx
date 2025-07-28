import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSidebarUser } from '../../sidebarContext';
import Button from "../Components/Button";
import OTPverification from "../Components/OTPverification";
import { useTheme } from '../theme.jsx';
import { register, login as loginApi, verifyOtp, resendOtp, setAuthToken } from '../services/api';
import { migrateToUserSpecificStorage } from '../utils/userStorage';

const Login = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { setUsername, setName } = useSidebarUser();
  const [name, setNameInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Email validation function-
  const isValidEmail = (email) => {
    // Simple email regex for validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      <View
        className="rounded-full overflow-hidden"
        style={{ width: "40%", aspectRatio: 1, alignSelf: "center" }}>
        <Image
          source={require("../../assets/images/Asset 4.png")}
          className="w-full h-full object-cover"
          resizeMode="contain"
        />
      </View>

      <View style={{ width: "80%", marginTop: 32 }}>
        <TextInput
          placeholder="Name"
          placeholderTextColor={theme.inputPlaceholder}
          value={name}
          onChangeText={setNameInput}
          editable={true}
          textContentType="name"
          autoComplete="name"
          style={[styles.input, { 
            borderColor: theme.borderLight, 
            backgroundColor: theme.inputBackground,
            color: theme.primaryText 
          }]}
        />
        {submitted && !name ? (
          <Text style={{ color: theme.error }}>Name is required</Text>
        ) : null}

        <TextInput
          placeholder="Email"
          placeholderTextColor={theme.inputPlaceholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={true}
          textContentType="emailAddress"
          autoComplete="email"
          style={[styles.input, { 
            borderColor: theme.borderLight, 
            backgroundColor: theme.inputBackground,
            color: theme.primaryText 
          }]}
        />
        {submitted && !email ? (
          <Text style={{ color: theme.error }}>Email is required</Text>
        ) : submitted && !isValidEmail(email) ? (
          <Text style={{ color: theme.error }}>Enter a valid email address</Text>
        ) : null}

        <View style={{ position: "relative", marginBottom: 12 }}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={theme.inputPlaceholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={true}
            textContentType="password"
            autoComplete="password"
            style={[styles.input, { 
              borderColor: theme.borderLight, 
              backgroundColor: theme.inputBackground,
              color: theme.primaryText,
              paddingRight: 40 
            }]}
          />
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color={theme.secondaryText}
            style={{ position: "absolute", right: 10, top: 12 }}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        {submitted && !password ? (
          <Text style={{ color: theme.error }}>Password is required</Text>
        ) : null}

        <View style={{ position: "relative", marginBottom: 12 }}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={theme.inputPlaceholder}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            editable={true}
            textContentType="password"
            autoComplete="password"
            style={[styles.input, { 
              borderColor: theme.borderLight, 
              backgroundColor: theme.inputBackground,
              color: theme.primaryText,
              paddingRight: 40 
            }]}
          />
          <MaterialIcons
            name={showConfirmPassword ? "visibility" : "visibility-off"}
            size={24}
            color={theme.secondaryText}
            style={{ position: "absolute", right: 10, top: 12 }}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </View>
        {submitted && !confirmPassword ? (
          <Text style={{ color: theme.error }}>Confirm Password is required</Text>
        ) : null}

        <Button
          title={loading ? "Creating..." : "Create Account"}
          onPress={async () => {
            setSubmitted(true);
            setError("");
            if (
              name &&
              email &&
              isValidEmail(email) &&
              password &&
              confirmPassword
            ) {
              setLoading(true);
              try {
                const res = await register({ username: name, email, password });
                if (res.status === 201) {
                  setUsername(email);
                  setName(name);
                  await AsyncStorage.setItem('profileUsername', email);
                  await AsyncStorage.setItem('profileName', name);
                  // Migrate existing data to user-specific storage
                  await migrateToUserSpecificStorage();
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login1', params: { email, name } }],
                  });
                } else {
                  setError(typeof res.data === 'string' ? res.data : (res.data?.message || 'Registration failed'));
                }
              } catch (e) {
                const msg = e.response?.data;
                setError(typeof msg === 'string' ? msg : (msg?.message || 'Registration failed'));
              } finally {
                setLoading(false);
              }
            }
          }}
        />
        {error ? <Text style={{ color: theme.error }}>{error}</Text> : null}
      </View>
      <View className="mt-4 flex-row items-center">
        <Text style={[styles.loginText, { color: theme.primaryText }]}>Already have an account?</Text>
        <TouchableOpacity
          className=""
          onPress={() => navigation.navigate("Login2")}>
          <Text style={[styles.loginLink, { color: theme.primaryGreen }]}> Log in</Text>
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-10">
        <Text style={[styles.footerText, { color: theme.secondaryText }]}>
          <MaterialIcons
            name="lock"
            size={20}
            color={theme.primaryGreen}
            style={{ marginRight: 6 }}
          />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          sapiente
        </Text>
      </View>
    </View>
  );
};

export const Login1 = (props) => {
  const { route = {} } = props;
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { setUsername, setName } = useSidebarUser();
  const [otp, setOtp] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [otpKey, setOtpKey] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Get email and name from params if present, fallback to empty string
  const email = route?.params?.email || '';
  const name = route?.params?.name || '';

  // Remount OTP inputs after a short delay when screen is shown
  useEffect(() => {
    const timeout = setTimeout(() => setOtpKey(Date.now()), 300);
    return () => clearTimeout(timeout);
  }, [route?.params?.email, route?.params?.name]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (showResend && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    if (showResend && timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [showResend, timer]);

  // Reset timer when resend is clicked
  const handleResend = async () => {
    setTimer(30);
    setCanResend(false);
    setShowResend(true);
    setError("");
    try {
      await resendOtp(email);
    } catch (e) {
      setError('Failed to resend OTP');
    }
  };

  // When 6 digits entered, instantly navigate
  useEffect(() => {
    if (otp.length === 6) {
      (async () => {
        setLoading(true);
        setError("");
        try {
          const res = await verifyOtp({ email, otp });
          if (res.data && res.data.statusCode === 200 && res.data.token) {
            await AsyncStorage.setItem('isLoggedIn', 'true');
            await AsyncStorage.setItem('jwtToken', res.data.token);
            setAuthToken(res.data.token);
            if (email) {
              setUsername(email);
              await AsyncStorage.setItem('profileUsername', email);
            }
            if (name) {
              setName(name);
              await AsyncStorage.setItem('profileName', name);
            }
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          } else {
            setError(res.data?.message || 'OTP verification failed');
          }
        } catch (e) {
          setError(e.response?.data?.message || 'OTP verification failed');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [otp]);

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
      {/* Dummy hidden input to break autofill chain */}
      <TextInput
        style={{ height: 0, width: 0, opacity: 0, position: 'absolute' }}
        autoComplete="off"
        importantForAutofill="no"
        value=""
        editable={false}
      />
      <OTPverification key={otpKey} value={otp} onChange={setOtp} />
      {error ? <Text style={{ color: theme.error }}>{error}</Text> : null}
      <Button
        title={loading ? "Verifying..." : "Verify"}
        onPress={() => {
          setShowResend(true);
          setTimer(30);
          setCanResend(false);
        }}
        disabled={loading}
      />
      {showResend && (
        <TouchableOpacity
          className="px-[28%] py-3 rounded-full mt-4 border flex-row justify-center items-center"
          style={{
            backgroundColor: canResend ? theme.primaryGreen : theme.inputBackground,
            borderColor: theme.primaryGreen,
          }}
          disabled={!canResend}
          onPress={handleResend}
        >
          <Text
            className="text-lg font-semibold text-center"
            style={{
              color: canResend ? theme.inverseText : theme.primaryGreen,
              marginRight: timer > 0 ? 8 : 0,
            }}>
            Resend Code
          </Text>
          {timer > 0 && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="timer" size={20} color={theme.primaryGreen} />
              <Text style={{ marginLeft: 4, fontSize: 16, color: theme.primaryGreen }}>
                {timer}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      <View className="absolute bottom-10">
        <Text style={[styles.footerText, { color: theme.secondaryText }]}> 
          <MaterialIcons
            name="lock"
            size={20}
            color={theme.primaryGreen}
            style={{ marginRight: 6 }}
          />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          sapiente
        </Text>
      </View>
    </View>
  );
};

export const Login2 = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { setUsername, setName } = useSidebarUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      <View style={{ width: "80%", marginTop: 32 }}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={theme.inputPlaceholder}
          value={email}
          onChangeText={setEmail}
          style={[styles.input, { 
            borderColor: theme.borderLight, 
            backgroundColor: theme.inputBackground,
            color: theme.primaryText 
          }]}
        />
        {submitted && !email ? (
          <Text style={{ color: theme.error }}>Email is required</Text>
        ) : null}

        <View style={{ position: "relative", marginBottom: 12 }}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={theme.inputPlaceholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={[styles.input, { 
              borderColor: theme.borderLight, 
              backgroundColor: theme.inputBackground,
              color: theme.primaryText,
              paddingRight: 40 
            }]}
          />
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color={theme.secondaryText}
            style={{ position: "absolute", right: 10, top: 12 }}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        {submitted && !password ? (
          <Text style={{ color: theme.error }}>Password is required</Text>
        ) : null}

        <Button
          title={loading ? "Logging in..." : "Log In"}
          onPress={async () => {
            setSubmitted(true);
            setError("");
            if (email && password) {
              setLoading(true);
              try {
                const res = await loginApi({ email, password });
                if (res.data && res.data.statusCode === 200 && res.data.token) {
                  await AsyncStorage.setItem('isLoggedIn', 'true');
                  await AsyncStorage.setItem('jwtToken', res.data.token);
                  setAuthToken(res.data.token);
                  setUsername(email);
                  await AsyncStorage.setItem('profileUsername', email);
                  const storedName = await AsyncStorage.getItem('profileName');
                  if (storedName) setName(storedName);
                  // Migrate existing data to user-specific storage
                  await migrateToUserSpecificStorage();
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  });
                } else {
                  setError(res.data?.message || 'Login failed');
                }
              } catch (e) {
                setError(e.response?.data?.message || 'Login failed');
              } finally {
                setLoading(false);
              }
            }
          }}
        />
        {error ? <Text style={{ color: theme.error }}>{error}</Text> : null}
      </View>

      <View className="absolute bottom-10">
        <Text style={[styles.footerText, { color: theme.secondaryText }]}>
          <MaterialIcons
            name="lock"
            size={20}
            color={theme.primaryGreen}
            style={{ marginRight: 6 }}
          />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          sapiente
        </Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: '40%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
  },
  loginText: {
    fontSize: 20,
  },
  loginLink: {
    fontSize: 20,
  },
  footerText: {
    fontSize: 18,
    textAlign: 'center',
  },
};

export default Login;