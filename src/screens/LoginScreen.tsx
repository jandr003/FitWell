import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import WavelengthHeader from '../components/WavelengthHeader';

interface LoginScreenProps {
  onSignUpPress?: () => void;
  onForgotPasswordPress?: () => void;
  onLoginPress?: (email: string, pass: string) => void;
  onBackToWelcome?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        bounces={false}>

        <WavelengthHeader />

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
});

export default LoginScreen;
