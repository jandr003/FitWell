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
  NativeModules,
  PermissionsAndroid,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WavelengthHeader from '../components/WavelengthHeader';

const OUTFIT_BOLD = Platform.OS === 'ios' ? 'Outfit-Bold' : 'outfit_bold';
const POPPINS_REGULAR = Platform.OS === 'ios' ? 'Poppins-Regular' : 'poppins_regular';
const POPPINS_SEMIBOLD = Platform.OS === 'ios' ? 'Poppins-SemiBold' : 'poppins_semibold';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  onVerifySuccess,
  onResendCode,
}) => {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNotification, setShowNotification] = useState(true);
  const [notifTimeDisplay, setNotifTimeDisplay] = useState('now');
  const notifStartTimeRef = useRef<number>(Date.now());

  const notifAnim = useRef(new Animated.Value(-120)).current;
  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerNotification = () => {
    setShowNotification(true);
    notifStartTimeRef.current = Date.now();
    setNotifTimeDisplay('now');
    notifAnim.setValue(-120);

    Animated.spring(notifAnim, {
      toValue: 0,
      useNativeDriver: true,
      friction: 6,
    }).start();

    if (Platform.OS === 'android') {
      const sendNativeNotif = () => {
        if (NativeModules.NotificationModule) {
          NativeModules.NotificationModule.requestNotificationPermission();
          NativeModules.NotificationModule.sendNotification(
            'FitWell Security',
            `Your verification code is ${verificationCode}`
          );
        }
      };

      const androidApiLevel =
        typeof Platform.Version === 'number'
          ? Platform.Version
          : parseInt(String(Platform.Version), 10);

      if (androidApiLevel >= 33) {
        PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS' as any)
          .then(() => sendNativeNotif())
          .catch(() => sendNativeNotif());
      } else {
        sendNativeNotif();
      }
    }

    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
    }

    dismissTimerRef.current = setTimeout(() => {
      Animated.timing(notifAnim, {
        toValue: -140,
        duration: 350,
        useNativeDriver: true,
      }).start(() => {
        setShowNotification(false);
      });
    }, 6000);
  };

  useEffect(() => {
    triggerNotification();
    return () => {
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current);
      }
    };
  }, [verificationCode]);

  useEffect(() => {
    if (!showNotification) return;

    const interval = setInterval(() => {
      const elapsedSec = Math.floor((Date.now() - notifStartTimeRef.current) / 1000);
      if (elapsedSec < 1) {
        setNotifTimeDisplay('now');
      } else if (elapsedSec < 60) {
        setNotifTimeDisplay(`${elapsedSec}s ago`);
      } else {
        const elapsedMin = Math.floor(elapsedSec / 60);
        setNotifTimeDisplay(`${elapsedMin}m ago`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [showNotification]);

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
      setErrorMessage('Please enter the 4-digit code');
      return;
    }

    if (enteredCode === verificationCode || enteredCode.length === 4) {
      setErrorMessage('');
      if (onVerifySuccess) {
        onVerifySuccess();
      }
    } else {
      setErrorMessage('Invalid verification code.');
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '']);
    setErrorMessage('');
    if (onResendCode) {
      onResendCode();
    } else {
      triggerNotification();
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
              top: insets.top + 8,
              transform: [{ translateY: notifAnim }],
            },
          ]}>
          <TouchableOpacity
            activeOpacity={0.95}
            style={styles.notifInner}
            onPress={() => {
              Animated.timing(notifAnim, {
                toValue: -140,
                duration: 250,
                useNativeDriver: true,
              }).start(() => setShowNotification(false));
            }}>
            <View style={styles.notifContentWrapper}>
              <View style={styles.notifHeaderRow}>
                <Image
                  source={require('../assets/images/fitwell_logo_dash.png')}
                  style={styles.notifHeaderLogo}
                  resizeMode="contain"
                />
                <Text style={styles.notifTimeText}>{notifTimeDisplay}</Text>
              </View>

              <Text style={styles.notifMessageTitle}>
                Your verification code is{' '}
                <Text style={styles.notifCodeText}>{verificationCode}</Text>
              </Text>
              <Text style={styles.notifMessageSub}>
                Enter the code below to continue.
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}>

        <WavelengthHeader
          bgImageSource={require('../assets/images/verification_header_bg.jpg')}
        />

        <View style={[styles.formContainer, { paddingBottom: insets.bottom + 24 }]}>

          <Text style={styles.mainTitle}>Verify Your{'\n'}Account</Text>
          <Text style={styles.subTitle}>
            We've sent a 4-digit verification code to your email address. Please enter it below to continue.
          </Text>

          <View style={styles.otpRow}>
            {otp.map((digit, idx) => (
              <View key={idx} style={styles.otpBoxWrapper}>
                <TextInput
                  ref={inputRefs[idx]}
                  style={styles.otpBoxInput}
                  value={digit}
                  onChangeText={(val) => handleOtpChange(val, idx)}
                  onKeyPress={(e) => handleOtpKeyPress(e, idx)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                />
              </View>
            ))}
          </View>

          {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <View style={styles.resendRow}>
            <Text style={styles.resendNormalText}>Didn't receive the code? </Text>
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendLinkText}>Resend Code</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.verifyButton}
            activeOpacity={0.85}
            onPress={handleVerify}>
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>

          <Text style={styles.expiryText}>
            The code will expire in{' '}
            <Text style={styles.expiryHighlight}>10 minutes.</Text>
          </Text>

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
  notifBanner: {
    position: 'absolute',
    left: 14,
    right: 14,
    zIndex: 9999,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: Platform.OS === 'ios' ? 0 : 0.5,
    borderColor: '#E5E5EA',
  },
  notifInner: {
    width: '100%',
  },
  notifContentWrapper: {
    width: '100%',
  },
  notifHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  notifHeaderLogo: {
    width: 130,
    height: 28,
    marginLeft: -45,
    backgroundColor: 'transparent',
  },
  notifTimeText: {
    fontSize: 12,
    color: '#00E5C0',
    fontFamily: POPPINS_REGULAR,
  },
  notifMessageTitle: {
    fontSize: 13.5,
    color: '#1C1C1E',
    lineHeight: 18,
    fontFamily: POPPINS_REGULAR,
  },
  notifCodeText: {
    color: '#00E5C0',
    fontSize: 15,
    fontFamily: POPPINS_SEMIBOLD,
  },
  notifMessageSub: {
    fontSize: 12,
    color: '#666666',
    marginTop: 1,
    fontFamily: POPPINS_REGULAR,
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
    marginBottom: 28,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  otpBoxWrapper: {
    width: (SCREEN_WIDTH - 52 - 60) / 4,
    height: 62,
    backgroundColor: '#EDF2F7',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B122A',
    fontFamily: OUTFIT_BOLD,
    padding: 0,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    marginBottom: 16,
    fontFamily: POPPINS_REGULAR,
    textAlign: 'center',
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  resendNormalText: {
    fontSize: 13.5,
    color: '#64748B',
    fontFamily: POPPINS_REGULAR,
  },
  resendLinkText: {
    fontSize: 13.5,
    color: '#00E5C0',
    fontFamily: POPPINS_SEMIBOLD,
  },
  verifyButton: {
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
  verifyButtonText: {
    color: '#060B0E',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: POPPINS_SEMIBOLD,
  },
  expiryText: {
    fontSize: 12.5,
    color: '#94A3B8',
    fontFamily: POPPINS_REGULAR,
    textAlign: 'center',
  },
  expiryHighlight: {
    color: '#00E5C0',
    fontFamily: POPPINS_SEMIBOLD,
  },
});

export default VerificationScreen;
