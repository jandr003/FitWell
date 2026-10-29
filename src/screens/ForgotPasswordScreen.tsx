import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
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

interface ForgotPasswordScreenProps {
  onBackToLogin?: () => void;
  onContinue?: (email: string) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBackToLogin,
  onContinue,
}) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendResetLink = () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      return;
    }
    setErrorMessage('');
    if (onContinue) {
      onContinue(email.trim());
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
          bgImageSource={require('../assets/images/forgot_pass_header_bg.jpg')}
        />

        <View style={[styles.formContainer, { paddingBottom: insets.bottom + 24 }]}>

          <Text style={styles.mainTitle}>Forgot Your{'\n'}Password?</Text>
          <Text style={styles.subTitle}>
            Enter your email address and we'll send you instructions to reset your password.
          </Text>

          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              placeholder="Email address"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errorMessage) setErrorMessage('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <TouchableOpacity
            style={styles.sendButton}
            activeOpacity={0.85}
            onPress={handleSendResetLink}>
            <Text style={styles.sendButtonText}>Send Reset Link</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.backToLoginButton}
            onPress={onBackToLogin}>
            <Text style={styles.backToLoginText}>Back to Login</Text>
          </TouchableOpacity>

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
    marginBottom: 6,
    letterSpacing: -0.5,
    lineHeight: 38,
  },
  subTitle: {
    fontSize: 14.5,
    color: '#64748B',
    fontFamily: POPPINS_REGULAR,
    lineHeight: 22,
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
    marginBottom: 20,
    position: 'relative',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#0B122A',
    fontFamily: POPPINS_REGULAR,
    padding: 0,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    marginBottom: 16,
    fontFamily: POPPINS_REGULAR,
  },
  sendButton: {
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
  sendButtonText: {
    color: '#060B0E',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: POPPINS_SEMIBOLD,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
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
  backToLoginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -4,
  },
  backToLoginText: {
    fontSize: 14.5,
    color: '#00E5C0',
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

export default ForgotPasswordScreen;
