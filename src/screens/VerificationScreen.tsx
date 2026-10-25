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

const ROUNDED_FONT = 'vaga_round';
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
    }, 4500);
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
      if (elapsedSec < 5) {
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

  const handleResend = () => {
    triggerNotification();
    if (onResendCode) {
      onResendCode();
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

      <View style={StyleSheet.absoluteFill} pointerEvents="none">
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
            <TouchableOpacity onPress={handleResend}>
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
    color: '#409CFF',
    fontFamily: ROUNDED_FONT,
  },
  notifMessageTitle: {
    fontSize: 13.5,
    color: '#1C1C1E',
    lineHeight: 18,
    fontFamily: ROUNDED_FONT,
  },
  notifCodeText: {
    color: '#00D182',
    fontSize: 15,
    fontFamily: ROUNDED_FONT,
  },
  notifMessageSub: {
    fontSize: 12,
    color: '#666666',
    marginTop: 1,
    fontFamily: ROUNDED_FONT,
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
  boldText: {
    color: '#0A3323',
    fontFamily: ROUNDED_FONT,
  },
  inputLabel: {
    fontSize: 13,
    color: '#333333',
    marginBottom: 8,
    fontFamily: ROUNDED_FONT,
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
    color: '#0A3323',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    marginBottom: 12,
    fontFamily: ROUNDED_FONT,
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
    fontFamily: ROUNDED_FONT,
  },
  resendLinkText: {
    fontSize: 13,
    color: '#00FF9D',
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
});

export default VerificationScreen;
