import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WavelengthHeader from '../components/WavelengthHeader';

interface WelcomeScreenProps {
  onLoginSubmit?: (email: string, pass: string) => void;
  onSignUpPress?: () => void;
  onForgotPasswordPress?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onLoginSubmit,
  onSignUpPress,
  onForgotPasswordPress,
}) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        bounces={false}>

        <WavelengthHeader title="Login" subtitle="Welcome Back!" />

        <View style={[styles.formContainer, { paddingBottom: insets.bottom + 24 }]}>

          <Text style={styles.inputLabel}>Enter email address</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email Address"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.rightIconWrapper}>
              <Text style={styles.inputIconText}>👤</Text>
            </View>
          </View>

          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 45 }]}
              placeholder="Enter Password"
              placeholderTextColor="#94A3B8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.rightIconWrapper}
              onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={
                  showPassword
                    ? require('../assets/images/eye_open.png')
                    : require('../assets/images/eye_closed.png')
                }
                style={styles.eyeIconImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsRow}>
            <View style={styles.rememberMeWrapper}>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{ false: '#CBD5E1', true: '#00E5C0' }}
                thumbColor="#FFFFFF"
                style={styles.switchControl}
              />
              <Text style={styles.rememberMeText}>Remember me</Text>
            </View>

            <TouchableOpacity onPress={onForgotPasswordPress}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.85}
            onPress={() => onLoginSubmit && onLoginSubmit(email, password)}>
            <Text style={styles.loginButtonText}>log in</Text>
          </TouchableOpacity>

          <Text style={styles.signInWithText}>Sign in with</Text>
          <View style={styles.socialButtonsRow}>
            <TouchableOpacity style={styles.socialCircleButton} activeOpacity={0.8}>
              <Image
                source={require('../assets/images/GOOGLE.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialCircleButton} activeOpacity={0.8}>
              <Image
                source={require('../assets/images/FACEBOOK.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.signUpRow}>
            <Text style={styles.noAccountText}>Don't have an account? </Text>
            <TouchableOpacity onPress={onSignUpPress}>
              <Text style={styles.signUpText}>Sign up</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    paddingHorizontal: 28,
    paddingTop: 16,
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 18,
  },
  input: {
    backgroundColor: '#EDF2F7',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1E293B',
  },
  rightIconWrapper: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIconText: {
    fontSize: 18,
    color: '#64748B',
  },
  eyeIconImage: {
    width: 22,
    height: 22,
    tintColor: '#64748B',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberMeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  switchControl: {
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
  },
  rememberMeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FF4D4D',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#080D22',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    elevation: 3,
    shadowColor: '#080D22',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInWithText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 14,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  socialCircleButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  socialIcon: {
    width: 26,
    height: 26,
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountText: {
    fontSize: 13,
    color: '#64748B',
  },
  signUpText: {
    fontSize: 13,
    color: '#00E5C0',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
