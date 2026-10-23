import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  PanResponder,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.58;
const CARD_REST_POSITION = height;

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
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const cardAnim = useRef(new Animated.Value(CARD_REST_POSITION)).current;

  const openLoginSheet = () => {
    setIsLoginOpen(true);
    Animated.timing(cardAnim, {
      toValue: 0,
      duration: 320,
      useNativeDriver: true,
    }).start();
  };

  const closeLoginSheet = () => {
    Animated.timing(cardAnim, {
      toValue: CARD_REST_POSITION,
      duration: 280,
      useNativeDriver: true,
    }).start(() => {
      setIsLoginOpen(false);
    });
  };

  const isLoginOpenRef = useRef(isLoginOpen);
  isLoginOpenRef.current = isLoginOpen;

  const panResponderRef = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (!isLoginOpenRef.current) {
          if (gestureState.dy < 0) {
            cardAnim.setValue(Math.max(0, CARD_REST_POSITION + gestureState.dy));
          }
        } else {
          if (gestureState.dy > 0) {
            cardAnim.setValue(Math.min(CARD_REST_POSITION, gestureState.dy));
          }
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (!isLoginOpenRef.current) {
          if (gestureState.dy < -50 || gestureState.vy < -0.3) {
            openLoginSheet();
          } else {
            Animated.spring(cardAnim, {
              toValue: CARD_REST_POSITION,
              friction: 6,
              useNativeDriver: true,
            }).start();
          }
        } else {
          if (gestureState.dy > 50 || gestureState.vy > 0.3) {
            closeLoginSheet();
          } else {
            Animated.spring(cardAnim, {
              toValue: 0,
              friction: 6,
              useNativeDriver: true,
            }).start();
          }
        }
      },
    })
  );

  const taglineOpacity = cardAnim.interpolate({
    inputRange: [0, CARD_REST_POSITION * 0.4, CARD_REST_POSITION],
    outputRange: [0, 0.3, 1],
    extrapolate: 'clamp',
  });

  const welcomeHeaderOpacity = cardAnim.interpolate({
    inputRange: [0, CARD_REST_POSITION * 0.6, CARD_REST_POSITION],
    outputRange: [1, 0.2, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container} {...panResponderRef.current.panHandlers}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.darkOverlayFull} />
      </View>

      <View style={styles.topHeaderContainer}>
        <View style={[styles.headerTextWrapper, { top: height * 0.62 }]}>
          <Animated.View style={[styles.welcomeTaglineBox, { opacity: taglineOpacity }]}>
            <Text style={styles.headingText}>Swipe Up to</Text>
            <Text style={styles.headingText}>Begin Your</Text>
            <Text style={styles.headingText}>
              <Text style={styles.highlightText}>Fitness</Text> Journey
            </Text>
          </Animated.View>
        </View>

        <Animated.View style={[styles.greetingHeaderBox, { opacity: welcomeHeaderOpacity, top: insets.top + 30 }]}>
          <Image
            source={require('../assets/images/FITWELL_LOGO.png')}
            style={styles.logoHeaderImage}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View style={[styles.chevronContainer, { opacity: taglineOpacity, bottom: insets.bottom + 20 }]} pointerEvents="none">
          <Text style={styles.chevronArrow}>▲</Text>
          <Text style={[styles.chevronArrow, { marginTop: -8 }]}>▲</Text>
        </Animated.View>
      </View>

      <Animated.View
        pointerEvents={isLoginOpen ? 'auto' : 'none'}
        style={[
          styles.slidingCard,
          {
            height: CARD_HEIGHT + 40,
            transform: [{ translateY: cardAnim }],
          },
        ]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={[styles.cardScrollContent, { paddingBottom: insets.bottom + 24 }]}
            keyboardShouldPersistTaps="handled"
            bounces={false}>

            <View style={styles.dragHandleBar} />

            <Text style={styles.cardTitle}>Let’s Get Moving</Text>
            <Text style={styles.cardSubtitle}>Keep moving at your own pace</Text>

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
              style={styles.forgotPasswordContainer}
              onPress={onForgotPasswordPress}>
              <Text style={styles.forgotPasswordText}>Forgot my Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.8}
              onPress={() => onLoginSubmit && onLoginSubmit(email, password)}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.signUpRow}>
              <Text style={styles.noAccountText}>Don't have an account? </Text>
              <TouchableOpacity onPress={onSignUpPress}>
                <Text style={styles.signUpText}>Sign up</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
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

          </ScrollView>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '65%',
    width: '100%',
  },
  topHeaderContainer: {
    flex: 1,
    position: 'relative',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 20,
    zIndex: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backArrow: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  headerTextWrapper: {
    position: 'absolute',
    left: 28,
    right: 28,
  },
  welcomeTaglineBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  greetingHeaderBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoHeaderImage: {
    width: 460,
    height: 175,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  headingText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 44,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  highlightText: {
    color: '#00FF9D',
    fontStyle: 'italic',
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  welcomeTitleText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  chevronContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronArrow: {
    color: '#00FF9D',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  slidingCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F5F6F5',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  dragHandleBar: {
    width: 36,
    height: 4,
    backgroundColor: '#DDDDDD',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  cardScrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
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
    marginBottom: 24,
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#00FF9D',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
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
    marginTop: 6,
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

export default WelcomeScreen;
