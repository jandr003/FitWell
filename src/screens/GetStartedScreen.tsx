import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ROUNDED_FONT = Platform.OS === 'ios' ? 'Arial Rounded MT Bold' : 'sans-serif-rounded';

interface OnboardingStep {
  id: 'train' | 'track' | 'improve';
  title: string;
  description: string;
  buttonText: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'train',
    title: 'Build a stronger you.',
    description:
      'Discover workouts that suit your fitness level and goals. Start building a routine that works for you.',
    buttonText: 'Next',
  },
  {
    id: 'track',
    title: 'See your progress.',
    description:
      "Keep track of your workouts, monitor your activity, and see how far you've come over time.",
    buttonText: 'Next',
  },
  {
    id: 'improve',
    title: 'Become better every day.',
    description:
      'Build on your progress, stay consistent with your routine, and work toward reaching your fitness goals.',
    buttonText: 'Get Started',
  },
];

interface GetStartedScreenProps {
  onGetStartedPress?: () => void;
  onLoginPress?: () => void;
}

export const GetStartedScreen: React.FC<GetStartedScreenProps> = ({
  onGetStartedPress,
  onLoginPress,
}) => {
  const insets = useSafeAreaInsets();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const stepAnim = useRef(new Animated.Value(0)).current;

  const currentStep = ONBOARDING_STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === ONBOARDING_STEPS.length - 1;

  const animateToStep = (newIndex: number) => {
    if (newIndex === currentStepIndex) return;

    const isForward = newIndex > currentStepIndex;
    const enterStart = isForward ? 30 : -35;

    slideAnim.setValue(enterStart);
    fadeAnim.setValue(0.2);

    setCurrentStepIndex(newIndex);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.spring(stepAnim, {
        toValue: newIndex,
        friction: 8,
        tension: 70,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleNextPress = () => {
    if (isLastStep) {
      if (onGetStartedPress) onGetStartedPress();
    } else {
      animateToStep(currentStepIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image
          source={require('../assets/images/Sweaty Blue-Lit Gym Athlete.png')}
          style={styles.heroBgImage}
          blurRadius={Platform.OS === 'ios' ? 8 : 4}
          resizeMode="cover"
        />
        <View style={styles.darkGradientOverlay} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}>

        <View style={styles.topHeaderRow}>
          <View style={styles.topBrandingWrapper}>
            <Image
              source={require('../assets/images/fitwell_logo_dash.png')}
              style={styles.brandLogo}
              tintColor="#00E5C0"
              resizeMode="contain"
            />

            <View style={styles.taglineRow}>
              <Text
                style={[
                  styles.taglineWord,
                  currentStep.id === 'train'
                    ? styles.activeTaglineWord
                    : styles.inactiveTaglineWord,
                ]}>
                TRAIN
              </Text>

              <Text style={styles.taglineSpace}>   </Text>

              <Text
                style={[
                  styles.taglineWord,
                  currentStep.id === 'track'
                    ? styles.activeTaglineWord
                    : styles.inactiveTaglineWord,
                ]}>
                TRACK
              </Text>

              <Text style={styles.taglineSpace}>   </Text>

              <Text
                style={[
                  styles.taglineWord,
                  currentStep.id === 'improve'
                    ? styles.activeTaglineWord
                    : styles.inactiveTaglineWord,
                ]}>
                IMPROVE
              </Text>
            </View>
          </View>

          {!isLastStep && (
            <TouchableOpacity style={styles.skipButton} onPress={onGetStartedPress}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.mainBodyContent}>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            }}>
            <Text style={styles.headlineTitle}>
              {currentStep.id === 'train' ? (
                <>
                  Build a{'\n'}
                  <Text style={styles.highlightText}>stronger </Text>
                  you.
                </>
              ) : currentStep.id === 'track' ? (
                <>
                  See your{'\n'}
                  <Text style={styles.highlightText}>progress</Text>.
                </>
              ) : (
                <>
                  Become{'\n'}
                  <Text style={styles.highlightText}>better </Text>
                  every day.
                </>
              )}
            </Text>

            <Text style={styles.descriptionText}>{currentStep.description}</Text>
          </Animated.View>

          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.85}
            onPress={handleNextPress}>
            <Text style={styles.actionButtonText}>{currentStep.buttonText}</Text>
          </TouchableOpacity>

          <View style={styles.dotsIndicatorRow}>
            {ONBOARDING_STEPS.map((_, idx) => {
              const dotWidth = stepAnim.interpolate({
                inputRange: [idx - 1, idx, idx + 1],
                outputRange: [8, 24, 8],
                extrapolate: 'clamp',
              });

              const dotOpacity = stepAnim.interpolate({
                inputRange: [idx - 1, idx, idx + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });

              return (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.7}
                  onPress={() => animateToStep(idx)}>
                  <Animated.View
                    style={[
                      styles.dot,
                      {
                        width: dotWidth,
                        opacity: dotOpacity,
                        backgroundColor: '#00E5C0',
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.loginRow}>
            <Text style={styles.alreadyText}>Already have an account? </Text>
            <TouchableOpacity onPress={onLoginPress}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060B0E',
  },
  heroBgImage: {
    width: '100%',
    height: '100%',
  },
  darkGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 11, 14, 0.55)',
  },
  scrollContainer: {
    paddingHorizontal: 22,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  topHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  topBrandingWrapper: {
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
  },
  brandLogo: {
    width: 270,
    height: 68,
    marginLeft: -86,
    backgroundColor: 'transparent',
    tintColor: '#00E5C0',
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  taglineWord: {
    fontSize: 12,
    letterSpacing: 2.2,
    fontFamily: ROUNDED_FONT,
  },
  activeTaglineWord: {
    color: '#00E5C0',
    fontWeight: '900',
    textShadowColor: '#00E5C0',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  inactiveTaglineWord: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  taglineSpace: {
    fontSize: 12,
  },
  skipButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  skipText: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: ROUNDED_FONT,
  },
  mainBodyContent: {
    width: '100%',
    marginTop: 'auto',
  },
  headlineTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 44,
    marginBottom: 12,
    letterSpacing: -0.5,
    fontFamily: ROUNDED_FONT,
  },
  highlightText: {
    color: '#00E5C0',
    fontFamily: ROUNDED_FONT,
  },
  descriptionText: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 22,
    marginBottom: 36,
    fontFamily: ROUNDED_FONT,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  actionButton: {
    width: '100%',
    backgroundColor: '#00E5C0',
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#00E5C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  actionButtonText: {
    color: '#060B0E',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.5,
    fontFamily: ROUNDED_FONT,
  },
  dotsIndicatorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  alreadyText: {
    fontSize: 13.5,
    color: '#D1D5DB',
    fontFamily: ROUNDED_FONT,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  loginText: {
    fontSize: 13.5,
    color: '#00E5C0',
    fontWeight: '800',
    fontFamily: ROUNDED_FONT,
  },
});

export default GetStartedScreen;
