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

interface CreateNewPasswordScreenProps {
  onBackToLogin?: () => void;
  onSubmitSuccess?: () => void;
}

export const CreateNewPasswordScreen: React.FC<CreateNewPasswordScreenProps> = ({
  onBackToLogin,
  onSubmitSuccess,
}) => {
  const insets = useSafeAreaInsets();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const has8Chars = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);

  const handleSubmit = () => {
    if (!password) {
      setErrorMessage('Please enter a new password');
      return;
    }
    if (!has8Chars || !hasNumber || !hasUpper || !hasLower) {
      setErrorMessage('Please satisfy all password security criteria.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-check.');
      return;
    }

    setErrorMessage('');
    setIsSuccess(true);
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
          bgImageSource={require('../assets/images/create_pass_header_bg.jpg')}
        />

        <View style={[styles.formContainer, { paddingBottom: insets.bottom + 24 }]}>

          {!isSuccess ? (
            <>
              <Text style={styles.mainTitle}>Create New{'\n'}Password</Text>
              <Text style={styles.subTitle}>
                Your new password must be strong and secure. Make sure it's something you'll remember.
              </Text>

              <View style={styles.inputBox}>
                <TextInput
                  style={[styles.textInput, { paddingRight: 40 }]}
                  placeholder="New password"
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
                  placeholder="Confirm new password"
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

              <View style={styles.checklistContainer}>
                <View style={styles.checkItem}>
                  <View style={[styles.checkCircle, has8Chars && styles.checkCircleActive]}>
                    <Text style={[styles.checkMarkText, has8Chars && styles.checkMarkActive]}>✓</Text>
                  </View>
                  <Text style={[styles.checkLabel, has8Chars && styles.checkLabelActive]}>
                    At least 8 characters
                  </Text>
                </View>

                <View style={styles.checkItem}>
                  <View style={[styles.checkCircle, hasNumber && styles.checkCircleActive]}>
                    <Text style={[styles.checkMarkText, hasNumber && styles.checkMarkActive]}>✓</Text>
                  </View>
                  <Text style={[styles.checkLabel, hasNumber && styles.checkLabelActive]}>
                    Contains a number
                  </Text>
                </View>

                <View style={styles.checkItem}>
                  <View style={[styles.checkCircle, hasUpper && styles.checkCircleActive]}>
                    <Text style={[styles.checkMarkText, hasUpper && styles.checkMarkActive]}>✓</Text>
                  </View>
                  <Text style={[styles.checkLabel, hasUpper && styles.checkLabelActive]}>
                    Contains an uppercase letter
                  </Text>
                </View>

                <View style={styles.checkItem}>
                  <View style={[styles.checkCircle, hasLower && styles.checkCircleActive]}>
                    <Text style={[styles.checkMarkText, hasLower && styles.checkMarkActive]}>✓</Text>
                  </View>
                  <Text style={[styles.checkLabel, hasLower && styles.checkLabelActive]}>
                    Contains a lowercase letter
                  </Text>
                </View>
              </View>

              {errorMessage !== '' && (
                <Text style={styles.errorText}>{errorMessage}</Text>
              )}

              <TouchableOpacity
                style={styles.resetButton}
                activeOpacity={0.85}
                onPress={handleSubmit}>
                <Text style={styles.resetButtonText}>Reset Password</Text>
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
            </>
          ) : (
            <View style={styles.successWrapper}>
              <View style={styles.successBadge}>
                <Text style={styles.successIconText}>✓</Text>
              </View>

              <Text style={styles.mainTitleCenter}>Password Changed!</Text>
              <Text style={styles.subTitleCenter}>
                Your password has been reset successfully. You can now log in with your new password.
              </Text>

              <TouchableOpacity
                style={styles.resetButton}
                activeOpacity={0.85}
                onPress={onSubmitSuccess}>
                <Text style={styles.resetButtonText}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          )}

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
    marginBottom: 14,
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
  checklistContainer: {
    marginBottom: 20,
    marginTop: 4,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EDF2F7',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkCircleActive: {
    backgroundColor: '#00E5C0',
    borderColor: '#00E5C0',
  },
  checkMarkText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: 'bold',
  },
  checkMarkActive: {
    color: '#060B0E',
  },
  checkLabel: {
    fontSize: 13.5,
    color: '#94A3B8',
    fontFamily: POPPINS_REGULAR,
  },
  checkLabelActive: {
    color: '#0B122A',
    fontFamily: POPPINS_SEMIBOLD,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    marginBottom: 16,
    fontFamily: POPPINS_REGULAR,
  },
  resetButton: {
    width: '100%',
    backgroundColor: '#00E5C0',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#00E5C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  resetButtonText: {
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
  successWrapper: {
    alignItems: 'center',
    paddingTop: 20,
  },
  successBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#00E5C0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successIconText: {
    color: '#060B0E',
    fontSize: 32,
    fontWeight: 'bold',
  },
  mainTitleCenter: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B122A',
    fontFamily: OUTFIT_BOLD,
    marginBottom: 8,
    textAlign: 'center',
  },
  subTitleCenter: {
    fontSize: 14.5,
    color: '#64748B',
    fontFamily: POPPINS_REGULAR,
    lineHeight: 22,
    marginBottom: 28,
    textAlign: 'center',
  },
});

export default CreateNewPasswordScreen;
