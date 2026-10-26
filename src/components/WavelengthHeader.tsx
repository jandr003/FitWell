import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface WavelengthHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  darkColor?: string;
  lightColor?: string;
  heightRatio?: number;
}

export const WavelengthHeader: React.FC<WavelengthHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  darkColor = '#080D22',
  lightColor = '#F2F4F7',
  heightRatio = 0.35,
}) => {
  const insets = useSafeAreaInsets();
  const headerHeight = Math.round(SCREEN_HEIGHT * heightRatio);

  return (
    <View style={[styles.container, { height: headerHeight, backgroundColor: darkColor }]}>
      <View
        style={[
          styles.rightLightShape,
          {
            backgroundColor: lightColor,
            width: SCREEN_WIDTH * 0.82,
            height: headerHeight * 0.60,
            bottom: 0,
            right: -SCREEN_WIDTH * 0.08,
            borderTopLeftRadius: SCREEN_WIDTH * 0.48,
          },
        ]}
      />

      <View
        style={[
          styles.leftDarkDip,
          {
            backgroundColor: darkColor,
            width: SCREEN_WIDTH * 0.52,
            height: headerHeight * 0.36,
            bottom: 0,
            left: 0,
            borderBottomRightRadius: SCREEN_WIDTH * 0.36,
          },
        ]}
      />

      <View style={[styles.contentOverlay, { paddingTop: insets.top + 16 }]}>
        <View style={styles.topRow}>
          {showBackButton && (
            <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          )}

          <Image
            source={require('../assets/images/fitwell_logo_dash.png')}
            style={styles.brandLogoImage}
            tintColor="#00E5C0"
            resizeMode="contain"
          />
        </View>

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
  },
  rightLightShape: {
    position: 'absolute',
    zIndex: 1,
  },
  leftDarkDip: {
    position: 'absolute',
    zIndex: 2,
  },
  contentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
    paddingHorizontal: 24,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    marginRight: 12,
  },
  backArrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00E5C0',
  },
  brandLogoImage: {
    width: 200,
    height: 48,
    marginLeft: -45,
  },
  subtitleText: {
    fontSize: 15,
    color: '#94A3B8',
    fontWeight: '500',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 2,
  },
});

export default WavelengthHeader;
