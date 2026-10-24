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

const ROUNDED_FONT = 'vaga_round';
const { width } = Dimensions.get('window');

interface CreateNewPasswordScreenProps {
  onBack?: () => void;
  onSubmitSuccess?: () => void;
}

export const CreateNewPasswordScreen: React.FC<CreateNewPasswordScreenProps> = ({
  onBack,
  onSubmitSuccess,
}) => {
  const insets = useSafeAreaInsets();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    if (!password) {
      setErrorMessage('Please enter a new password');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
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

      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.darkOverlayFull} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        bounces={false}>

        <View style={[styles.topSection, { paddingTop: insets.top + 20 }]}>
          {onBack && (
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          )}

          <View style={styles.headerRow}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.greetingText}>Create New</Text>
              <Text style={styles.welcomeTitleText}>Password</Text>
            </View>
          </View>
        </View>

        <View style={[styles.cardContainer, { paddingBottom: insets.bottom + 24 }]}>
          {!isSuccess ? (
            <>
              <Text style={styles.cardTitle}>Create New Password</Text>
              <Text style={styles.cardSubtitle}>
                Your new password must be different from previous passwords.
              </Text>

              <Text style={styles.inputLabel}>Password</Text>
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

              <Text style={styles.inputLabel}>New Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, { paddingRight: 45 }]}
                  placeholder="Confirm New Password"
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
                style={styles.actionButton}
                activeOpacity={0.8}
                onPress={handleSubmit}>
                <Text style={styles.actionButtonText}>CONTINUE</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.successContainer}>
              <View style={styles.successBadge}>
                <Text style={styles.successBadgeText}>✓</Text>
              </View>

              <Text style={styles.cardTitle}>Password Changed!</Text>
              <Text style={styles.cardSubtitleCenter}>
                Your password has been reset successfully. You can now log in with your new password.
              </Text>

              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.8}
                onPress={onSubmitSuccess}>
                <Text style={styles.actionButtonText}>BACK TO LOGIN</Text>
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
    fontFamily: ROUNDED_FONT,
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
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: ROUNDED_FONT,
  },
  welcomeTitleText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: ROUNDED_FONT,
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
    paddingTop: 32,
    flex: 1,
  },
  cardTitle: {
    fontSize: 26,
    color: '#0A3323',
    marginBottom: 6,
    fontFamily: ROUNDED_FONT,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 24,
    fontFamily: ROUNDED_FONT,
  },
  cardSubtitleCenter: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 28,
    textAlign: 'center',
    fontFamily: ROUNDED_FONT,
  },
  inputLabel: {
    fontSize: 13,
    color: '#333333',
    marginBottom: 8,
    fontFamily: ROUNDED_FONT,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#333333',
    fontFamily: ROUNDED_FONT,
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
    marginBottom: 16,
    fontFamily: ROUNDED_FONT,
  },
  actionButton: {
    width: '100%',
    backgroundColor: '#00FF9D',
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
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    letterSpacing: 0.5,
    fontFamily: ROUNDED_FONT,
  },
  successContainer: {
    alignItems: 'center',
    paddingTop: 10,
    width: '100%',
  },
  successBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successBadgeText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: ROUNDED_FONT,
  },
});

export default CreateNewPasswordScreen;
