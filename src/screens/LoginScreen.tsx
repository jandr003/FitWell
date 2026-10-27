import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import WavelengthHeader from '../components/WavelengthHeader';

export const LoginScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <WavelengthHeader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
  },
});

export default LoginScreen;
