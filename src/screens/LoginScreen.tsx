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

interface LoginScreenProps {
  onSignUpPress?: () => void;
  onForgotPasswordPress?: () => void;
  onLoginPress?: (email: string, pass: string) => void;
  onBackToWelcome?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSignUpPress,
  onForgotPasswordPress,
  onLoginPress,
  onBackToWelcome,
}) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (onLoginPress) {
      onLoginPress(email, password);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0E0D" />

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
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.greetingText}>Hello John,</Text>
              <Text style={styles.welcomeTitleText}>Welcome Back!</Text>
            </View>

            <Image
              source={require('../assets/images/dumbbell.png')}
              style={styles.headerDumbbell}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={[styles.cardContainer, { paddingBottom: insets.bottom + 24 }]}>
          <Text style={styles.cardTitle}>Your Account</Text>
          <Text style={styles.cardSubtitle}>Sign in to your account</Text>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={setEmail}
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
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eyeIcon}>{showPassword ? '1' : '2'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={onForgotPasswordPress}>
            <Text style={styles.forgotPasswordText}>Forgot my Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.8}
            onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

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
    backgroundColor: '#0B0E0D',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
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
  welcomeTextContainer: {
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
    width: width * 0.38,
    height: width * 0.38,
  },
  cardContainer: {
    backgroundColor: '#F5F6F5',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 32,
    flex: 1,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0A3323',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 28,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#333333',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 14,
    top: 14,
  },
  eyeIcon: {
    fontSize: 18,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 28,
  },
  forgotPasswordText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#0A3B28',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  noAccountText: {
    fontSize: 14,
    color: '#666666',
  },
  signUpText: {
    fontSize: 14,
    color: '#0A3B28',
    fontWeight: '700',
  },
});

export default LoginScreen;
