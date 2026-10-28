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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WavelengthHeader from '../components/WavelengthHeader';

const OUTFIT_BOLD = Platform.OS === 'ios' ? 'Outfit-Bold' : 'outfit_bold';
const POPPINS_REGULAR = Platform.OS === 'ios' ? 'Poppins-Regular' : 'poppins_regular';
const POPPINS_SEMIBOLD = Platform.OS === 'ios' ? 'Poppins-SemiBold' : 'poppins_semibold';

interface SignUpScreenProps {
  onLoginPress?: () => void;
  onSignUpSubmit?: (fullName: string, email: string, pass: string) => void;
  onBackToWelcome?: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onLoginPress,
  onSignUpSubmit,
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

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}>

        <WavelengthHeader
          flipWave={true}
          bgImageSource={require('../assets/images/signup_header_bg.jpg')}
        />

        <View style={[styles.formContainer, { paddingBottom: insets.bottom + 24 }]}>

          <Text style={styles.mainTitle}>Create Your Account</Text>
          <Text style={styles.subTitle}>Join FitWell and start your fitness journey today.</Text>

          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              placeholder="Full name"
              placeholderTextColor="#94A3B8"
              value={fullName}
              onChangeText={(val) => {
                setFullName(val);
                if (errorMessage) setErrorMessage('');
              }}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              placeholder="Email address"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={(val) => {
                setEmail(val);
                if (errorMessage) setErrorMessage('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              style={[styles.textInput, { paddingRight: 40 }]}
              placeholder="Password"
              placeholderTextColor="#94A3B8"
              value={password}
              onChangeText={(val) => {
                setPassword(val);
                if (errorMessage) setErrorMessage('');
              }}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIconButton}
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

          <View style={styles.inputBox}>
            <TextInput
              style={[styles.textInput, { paddingRight: 40 }]}
              placeholder="Confirm password"
              placeholderTextColor="#94A3B8"
              value={confirmPassword}
              onChangeText={(val) => {
                setConfirmPassword(val);
                if (errorMessage) setErrorMessage('');
              }}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIconButton}
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
            activeOpacity={0.85}
            onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR SIGN UP WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtonsRow}>
            <TouchableOpacity style={styles.socialCircleButton} activeOpacity={0.8}>
              <Image
                source={require('../assets/images/FITBIT.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

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

          <View style={styles.loginRow}>
            <Text style={styles.alreadyText}>Already have an account? </Text>
            <TouchableOpacity onPress={onLoginPress}>
              <Text style={styles.loginText}>Log In</Text>
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
    backgroundColor: '#F3F5F8',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    paddingHorizontal: 26,
    paddingTop: 10,
    marginTop: 8,
    flex: 1,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0B122A',
    fontFamily: OUTFIT_BOLD,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subTitle: {
    fontSize: 15,
    color: '#64748B',
    fontFamily: POPPINS_REGULAR,
    marginBottom: 20,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 18,
    position: 'relative',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#0B122A',
    fontFamily: POPPINS_REGULAR,
    padding: 0,
  },
  eyeIconButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  eyeIconImage: {
    width: 20,
    height: 20,
    tintColor: '#64748B',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    marginBottom: 12,
    fontFamily: POPPINS_REGULAR,
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#00E5C0',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 18,
    elevation: 3,
    shadowColor: '#00E5C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  signUpButtonText: {
    color: '#060B0E',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: POPPINS_SEMIBOLD,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 11.5,
    color: '#94A3B8',
    fontFamily: POPPINS_REGULAR,
    paddingHorizontal: 12,
    letterSpacing: 0.8,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },
  socialCircleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  noAccountText: {
    fontSize: 13.5,
    color: '#64748B',
    fontFamily: POPPINS_REGULAR,
  },
  loginText: {
    fontSize: 13.5,
    color: '#00E5C0',
    fontFamily: POPPINS_SEMIBOLD,
  },
});

export default SignUpScreen;
