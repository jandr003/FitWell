import React, { useState, useRef, useEffect } from 'react';
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
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface VerificationScreenProps {
  email: string;
  verificationCode: string;
  onBack?: () => void;
  onVerifySuccess?: () => void;
  onResendCode?: () => void;
}

export const VerificationScreen: React.FC<VerificationScreenProps> = ({
  email,
  verificationCode,
  onBack,
  onVerifySuccess,
  onResendCode,
}) => {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNotification, setShowNotification] = useState(true);

  const notifAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.spring(notifAnim, {
      toValue: 0,
      useNativeDriver: true,
      friction: 6,
    }).start();
  }, [verificationCode]);

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (errorMessage) setErrorMessage('');

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = otp.join('');
    if (enteredCode.length < 4) {
      setErrorMessage('Please enter the full 4-digit code');
      return;
    }

    if (enteredCode === verificationCode) {
      setErrorMessage('');
      if (onVerifySuccess) {
        onVerifySuccess();
      }
    } else {
      setErrorMessage('Invalid verification code. Please check notification.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {showNotification && (
        <Animated.View
          style={[
            styles.notifBanner,
            {
              top: insets.top + 10,
              transform: [{ translateY: notifAnim }],
            },
          ]}>
          <View style={styles.notifHeaderRow}>
            <Text style={styles.notifAppTitle}>🔔 FITWELL SECURITY</Text>
            <TouchableOpacity onPress={() => setShowNotification(false)}>
              <Text style={styles.notifCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.notifBodyText}>
            Your verification code is:{' '}
            <Text style={styles.notifCodeText}>{verificationCode}</Text>
          </Text>
        </Animated.View>
      )}

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

        <View style={[styles.topSection, { paddingTop: insets.top + 70 }]}>
          {onBack && (
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          )}

          <View style={styles.headerRow}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.greetingText}>Verification</Text>
              <Text style={styles.welcomeTitleText}>Enter Code</Text>
            </View>

            <Image
              source={require('../assets/images/dumbbell.png')}
              style={styles.headerDumbbell}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={[styles.cardContainer, { paddingBottom: insets.bottom + 24 }]}>
          <Text style={styles.cardTitle}>Verification</Text>
          <Text style={styles.cardSubtitle}>
            We've sent a verification code to{' '}
            <Text style={styles.boldText}>{email || 'your email'}</Text>. Enter the code below to continue.
          </Text>

          <Text style={styles.inputLabel}>Enter 4-digit code</Text>
          <View style={styles.otpRow}>
            {otp.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={inputRefs[idx]}
                style={styles.otpBox}
                value={digit}
                onChangeText={(val) => handleOtpChange(val, idx)}
                onKeyPress={(e) => handleOtpKeyPress(e, idx)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <View style={styles.resendRow}>
            <Text style={styles.resendNormalText}>Didn't receive a code? </Text>
            <TouchableOpacity
              onPress={() => {
                setShowNotification(true);
                if (onResendCode) onResendCode();
              }}>
              <Text style={styles.resendLinkText}>Resend code!</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.8}
            onPress={handleVerify}>
            <Text style={styles.actionButtonText}>VERIFY</Text>
          </TouchableOpacity>
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
  notifBanner: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 999,
    backgroundColor: '#1E2522',
    borderWidth: 1,
    borderColor: '#00FF9D',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  notifHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifAppTitle: {
    color: '#00FF9D',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  notifCloseText: {
    color: '#CCCCCC',
    fontSize: 14,
    paddingHorizontal: 4,
  },
  notifBodyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  notifCodeText: {
    color: '#00FF9D',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 2,
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
    lineHeight: 20,
    marginBottom: 24,
  },
  boldText: {
    fontWeight: '700',
    color: '#0A3323',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 4,
  },
  otpBox: {
    width: width * 0.18,
    height: 56,
    backgroundColor: '#EAEAEA',
    borderBottomWidth: 3,
    borderBottomColor: '#00FF9D',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: '#0A3323',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    marginBottom: 12,
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 8,
  },
  resendNormalText: {
    fontSize: 13,
    color: '#666666',
  },
  resendLinkText: {
    fontSize: 13,
    color: '#00FF9D',
    fontWeight: '700',
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
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

export default VerificationScreen;
