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

        <WavelengthHeader />

        <View style={[styles.formContainer, { paddingBottom: insets.bottom + 24 }]}>

          <Text style={styles.mainTitle}>Sign in to FitWell</Text>
          <Text style={styles.subTitle}>Build a stronger version of you.</Text>

          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              placeholder="Email address"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
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
              onChangeText={setPassword}
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

          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={onForgotPasswordPress}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.85}
            onPress={() => onLoginSubmit && onLoginSubmit(email, password)}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
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

          <View style={styles.signUpRow}>
            <Text style={styles.noAccountText}>Don't have an account? </Text>
            <TouchableOpacity onPress={onSignUpPress}>
              <Text style={styles.signUpText}>Sign Up</Text>
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
    paddingTop: 8,
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
    marginBottom: 24,
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
    marginBottom: 16,
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
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: -4,
  },
  forgotPasswordText: {
    fontSize: 13.5,
    color: '#00E5C0',
    fontFamily: POPPINS_SEMIBOLD,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#00E5C0',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#00E5C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  loginButtonText: {
    color: '#060B0E',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: POPPINS_SEMIBOLD,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 28,
  },
  socialCircleButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
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
    width: 28,
    height: 28,
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountText: {
    fontSize: 13.5,
    color: '#64748B',
    fontFamily: POPPINS_REGULAR,
  },
  signUpText: {
    fontSize: 13.5,
    color: '#00E5C0',
    fontFamily: POPPINS_SEMIBOLD,
  },
});

export default WelcomeScreen;
