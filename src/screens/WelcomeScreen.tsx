import React, { useRef } from 'react';
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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  onSwipeUp?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSwipeUp }) => {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponderRef = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -100 || gestureState.vy < -0.5) {
          Animated.timing(translateY, {
            toValue: -height,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            if (onSwipeUp) {
              onSwipeUp();
            }
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  );

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
        },
      ]}
      {...panResponderRef.current.panHandlers}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <View style={StyleSheet.absoluteFill}>
        <Image
          source={require('../assets/images/workout_hero.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.darkOverlayFull} />

        <Image
          source={require('../assets/images/bottom_gradient.png')}
          style={styles.gradientOverlay}
          resizeMode="stretch"
        />
      </View>

      <View style={[styles.bottomContent, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Swipe Up to</Text>
          <Text style={styles.headingText}>
            your <Text style={styles.highlightText}>Fitness</Text>
          </Text>
          <Text style={styles.headingText}>track.</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSwipeUp}
          style={styles.swipeIndicatorContainer}>
          <View style={styles.chevronIconContainer}>
            <Text style={styles.chevronArrow}>▲</Text>
            <Text style={[styles.chevronArrow, { marginTop: -8 }]}>▲</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0E0D',
    justifyContent: 'flex-end',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  darkOverlayFull: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '65%',
    width: '100%',
  },
  bottomContent: {
    paddingHorizontal: 28,
    justifyContent: 'flex-end',
  },
  textContainer: {
    marginBottom: 28,
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
  swipeIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  chevronIconContainer: {
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
});

export default WelcomeScreen;
