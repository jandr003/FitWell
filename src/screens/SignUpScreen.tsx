import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface SignUpScreenProps {
  onLoginPress?: () => void;
  onSignUpSubmit?: (fullName: string, email: string, pass: string) => void;
  onBackToWelcome?: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onLoginPress,
  onSignUpSubmit,
  onBackToWelcome,
}) => {
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter a password');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setErrorMessage('');
    if (onSignUpSubmit) {
      onSignUpSubmit(fullName.trim(), email.trim(), password);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image
          source={require('../assets/images/workout_dark_cinematic.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.darkOverlayFull} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        bounces={false}>

        <View style={[styles.topSection, { paddingTop: insets.top + 20 }]}>
          {onBackToWelcome && (
            <TouchableOpacity style={styles.backButton} onPress={onBackToWelcome}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          )}

          <View style={styles.headerRow}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.greetingText}>Create Account</Text>
              <Text style={styles.welcomeTitleText}>Join FitWell</Text>
            </View>

            <Image
              source={require('../assets/images/dumbbell.png')}
              style={styles.headerDumbbell}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={[styles.cardContainer, { paddingBottom: insets.bottom + 24 }]}>
          <Text style={styles.cardTitle}>Get Started</Text>
          <Text style={styles.cardSubtitle}>Create your account to start your fitness journey</Text>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999999"
              value={fullName}
              onChangeText={(val) => {
                setFullName(val);
                if (errorMessage) setErrorMessage('');
              }}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={(val) => {
                setEmail(val);
                if (errorMessage) setErrorMessage('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 45 }]}
              placeholder="Enter Password"
              placeholderTextColor="#999999"
              value={password}
              onChangeText={(val) => {
                setPassword(val);
                if (errorMessage) setErrorMessage('');
              }}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIconContainer}
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

          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 45 }]}
              placeholder="Confirm Password"
              placeholderTextColor="#999999"
              value={confirmPassword}
              onChangeText={(val) => {
                setConfirmPassword(val);
                if (errorMessage) setErrorMessage('');
              }}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Image
                source={
                  showConfirmPassword
                    ? require('../assets/images/eye_open.png')
                    : require('../assets/images/eye_closed.png')
                }
                style={styles.eyeIconImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <TouchableOpacity
            style={styles.signUpButton}
            activeOpacity={0.8}
            onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.alreadyAccountText}>Already have an account? </Text>
            <TouchableOpacity onPress={onLoginPress}>
              <Text style={styles.loginLinkText}>Log in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR SIGN UP WITH</Text>
            <View style={styles.dividerLine} />
          </View>

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
            <TouchableOpacity style={styles.socialCircleButton} activeOpacity={0.8}>
              <Image
                source={require('../assets/images/FITBIT.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
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
    backgroundColor: '#0B0E0D',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  darkOverlayFull: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  backButton: {
    marginBottom: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backArrow: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  headerTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  welcomeTitleText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerDumbbell: {
    width: width * 0.35,
    height: width * 0.35,
  },
  cardContainer: {
    backgroundColor: '#F5F6F5',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 28,
    flex: 1,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0A3323',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 14,
  },
  input: {
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: '#333333',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
  },
  eyeIconImage: {
    width: 22,
    height: 22,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    marginBottom: 12,
  },
  signUpButton: {
    backgroundColor: '#00FF9D',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  alreadyAccountText: {
    fontSize: 14,
    color: '#666666',
  },
  loginLinkText: {
    fontSize: 14,
    color: '#0A3B28',
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    color: '#888888',
    fontSize: 11,
    fontWeight: '600',
    marginHorizontal: 10,
    letterSpacing: 0.5,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 4,
  },
  socialCircleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  socialIcon: {
    width: 28,
    height: 28,
  },
});

export default SignUpScreen;
