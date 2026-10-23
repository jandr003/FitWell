import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface GetStartedScreenProps {
  onGetStartedPress?: () => void;
  onLoginPress?: () => void;
}

export const GetStartedScreen: React.FC<GetStartedScreenProps> = ({
  onGetStartedPress,
  onLoginPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}>

        {/* Top Branding Section */}
        <View style={styles.topBrandingWrapper}>
          <Image
            source={require('../assets/images/fitwell_logo_dash.png')}
            style={styles.brandLogo}
            resizeMode="contain"
          />
          <Text style={styles.taglineText}>TRAIN  •  TRACK  •  IMPROVE</Text>
        </View>

        {/* Main Content Area */}
        <View style={styles.mainBodyContent}>
          {/* Headline */}
          <Text style={styles.headlineTitle}>
            Build a{'\n'}
            <Text style={styles.highlightText}>stronger </Text>
            you.
          </Text>

          {/* Subtitle / Description */}
          <Text style={styles.descriptionText}>
            Your fitness journey starts here.{'\n'}
            Train at your pace, track your progress,{'\n'}
            and work toward your goals.
          </Text>

          {/* 3 Feature Cards (No Emoji Stickers) */}
          <View style={styles.featureCardsRow}>
            {/* Workouts Card */}
            <View style={styles.featureCard}>
              <View style={styles.iconCircle}>
                <View style={styles.dumbbellWrapper}>
                  <View style={styles.dbPlate} />
                  <View style={styles.dbBar} />
                  <View style={styles.dbPlate} />
                </View>
              </View>
              <Text style={styles.featureTitle}>Workouts</Text>
              <Text style={styles.featureSubtitle}>Personalized for you</Text>
            </View>

            {/* Progress Card */}
            <View style={styles.featureCard}>
              <View style={styles.iconCircle}>
                <View style={styles.chartWrapper}>
                  <View style={[styles.chartBar, { height: 8 }]} />
                  <View style={[styles.chartBar, { height: 14 }]} />
                  <View style={[styles.chartBar, { height: 20 }]} />
                </View>
              </View>
              <Text style={styles.featureTitle}>Progress</Text>
              <Text style={styles.featureSubtitle}>See your growth</Text>
            </View>

            {/* Health Card */}
            <View style={styles.featureCard}>
              <View style={styles.iconCircle}>
                <View style={styles.pulseWrapper}>
                  <View style={styles.pulseLineHoriz} />
                  <View style={styles.pulseLineVert} />
                </View>
              </View>
              <Text style={styles.featureTitle}>Health</Text>
              <Text style={styles.featureSubtitle}>A better you, every day</Text>
            </View>
          </View>

          {/* Primary Action Button */}
          <TouchableOpacity
            style={styles.getStartedButton}
            activeOpacity={0.85}
            onPress={onGetStartedPress}>
            <Text style={styles.getStartedButtonText}>Get Started  →</Text>
          </TouchableOpacity>

          {/* Dots Indicator */}
          <View style={styles.dotsIndicatorRow}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          {/* Bottom Login Link */}
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
  scrollContainer: {
    paddingHorizontal: 22,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  topBrandingWrapper: {
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 20,
  },
  brandLogo: {
    width: 150,
    height: 38,
    marginLeft: -48,
    backgroundColor: 'transparent',
  },
  taglineText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#00E5C0',
    letterSpacing: 2,
    marginTop: -4,
  },
  mainBodyContent: {
    width: '100%',
    marginTop: 'auto',
  },
  headlineTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 42,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  highlightText: {
    color: '#00E5C0',
  },
  descriptionText: {
    fontSize: 13.5,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 24,
  },
  featureCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 28,
    gap: 8,
  },
  featureCard: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 30, 0.82)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 229, 192, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  /* Vector Icons (No Emoji Stickers) */
  dumbbellWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dbPlate: {
    width: 4,
    height: 14,
    backgroundColor: '#00E5C0',
    borderRadius: 1.5,
  },
  dbBar: {
    width: 12,
    height: 3,
    backgroundColor: '#00E5C0',
  },

  chartWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  chartBar: {
    width: 4,
    backgroundColor: '#00E5C0',
    borderRadius: 1,
  },

  pulseWrapper: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pulseLineHoriz: {
    width: 16,
    height: 3,
    backgroundColor: '#00E5C0',
    borderRadius: 1.5,
  },
  pulseLineVert: {
    width: 3,
    height: 16,
    backgroundColor: '#00E5C0',
    borderRadius: 1.5,
    position: 'absolute',
  },

  featureTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  featureSubtitle: {
    fontSize: 9.5,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 12,
  },
  getStartedButton: {
    width: '100%',
    backgroundColor: '#00E5C0',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#00E5C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  getStartedButtonText: {
    color: '#060B0E',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  dotsIndicatorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00E5C0',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  alreadyText: {
    fontSize: 13,
    color: '#94A3B8',
  },
  loginText: {
    fontSize: 13,
    color: '#00E5C0',
    fontWeight: '800',
  },
});

export default GetStartedScreen;
