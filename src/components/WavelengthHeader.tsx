import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface WavelengthHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  showLogo?: boolean;
  onBackPress?: () => void;
  bgImageSource?: ImageSourcePropType;
  overlayColor?: string;
  ribbonColor?: string;
  lightColor?: string;
  heightRatio?: number;
}

export const WavelengthHeader: React.FC<WavelengthHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  showLogo = true,
  onBackPress,
  bgImageSource = require('../assets/images/workout_header_bg.jpg'),
  overlayColor = 'rgba(6, 11, 24, 0.82)',
  ribbonColor,
  lightColor = '#F2F4F7',
  heightRatio = 0.37,
}) => {
  const insets = useSafeAreaInsets();
  const headerHeight = Math.round(SCREEN_HEIGHT * heightRatio);

  return (
    <View style={[styles.container, { height: headerHeight }]}>
      {bgImageSource ? (
        <Image
          source={bgImageSource}
          style={styles.bgImage}
          resizeMode="cover"
        />
      ) : null}

      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: overlayColor },
        ]}
      />

      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={StyleSheet.absoluteFill}>

        <Defs>
          <LinearGradient id="fitwellRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#00E5C0" stopOpacity={0.95} />
            <Stop offset="50%" stopColor="#00B4D8" stopOpacity={0.95} />
            <Stop offset="100%" stopColor="#0080FF" stopOpacity={0.95} />
          </LinearGradient>
        </Defs>

        <Path
          d="M 0,94.7 C 35,98.5 60,63 100,61 L 100,68 C 60,68 35,100 0,95 Z"
          fill={ribbonColor ? ribbonColor : 'url(#fitwellRibbonGrad)'}
        />

        <Path
          d="M 0,95 C 35,100 60,68 100,68 L 100,100 L 0,100 Z"
          fill={lightColor}
        />
      </Svg>

      <View style={[styles.contentOverlay, { paddingTop: insets.top + 12 }]}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        )}

        {showLogo && (
          <View style={styles.logoCenterContainer}>
            <Image
              source={require('../assets/images/fitwell_logo_dash.png')}
              style={styles.brandLogoImage}
              resizeMode="contain"
            />
          </View>
        )}

        {subtitle ? <Text style={styles.subtitleText}>{subtitle}</Text> : null}
        {title ? <Text style={styles.titleText}>{title}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#0A0F24',
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  contentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex: 20,
  },
  backArrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00E5C0',
  },
  logoCenterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: -30,
    marginBottom: 20,
  },
  brandLogoImage: {
    width: 290,
    height: 76,
    marginLeft: 0,
  },
  subtitleText: {
    fontSize: 16,
    color: '#CBD5E1',
    fontWeight: '500',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 2,
    textAlign: 'center',
  },
});

export default WavelengthHeader;
