import React, { useState, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GetStartedScreen from './src/screens/GetStartedScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import CreateNewPasswordScreen from './src/screens/CreateNewPasswordScreen';

type ScreenName = 'get_started' | 'welcome' | 'login' | 'signup' | 'forgot_password' | 'verification' | 'create_new_password';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('get_started');
  const [userEmail, setUserEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('5433');

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const navigateTo = (nextScreen: ScreenName) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen(nextScreen);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const generateNewCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setVerificationCode(code);
    return code;
  };

  const handleStartForgotPassword = () => {
    navigateTo('forgot_password');
  };

  const handleForgotPasswordEmailSubmit = (email: string) => {
    setUserEmail(email);
    generateNewCode();
    navigateTo('verification');
  };

  const handleVerificationSuccess = () => {
    navigateTo('create_new_password');
  };

  const handlePasswordResetComplete = () => {
    navigateTo('login');
  };

  const handleSignUpSubmit = (fullName: string, email: string) => {
    setUserEmail(email);
    generateNewCode();
    navigateTo('verification');
  };

  return (
    <SafeAreaProvider>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
          },
        ]}>
        {currentScreen === 'get_started' && (
          <GetStartedScreen
            onGetStartedPress={() => navigateTo('welcome')}
            onLoginPress={() => navigateTo('login')}
          />
        )}

        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onLoginSubmit={(email, pass) => console.log('Login:', email, pass)}
            onSignUpPress={() => navigateTo('signup')}
            onForgotPasswordPress={handleStartForgotPassword}
          />
        )}

        {currentScreen === 'login' && (
          <LoginScreen
            onBackToWelcome={() => navigateTo('welcome')}
            onSignUpPress={() => navigateTo('signup')}
            onForgotPasswordPress={handleStartForgotPassword}
            onLoginPress={(email, pass) => console.log('Login:', email, pass)}
          />
        )}

        {currentScreen === 'signup' && (
          <SignUpScreen
            onBackToWelcome={() => navigateTo('welcome')}
            onLoginPress={() => navigateTo('welcome')}
            onSignUpSubmit={handleSignUpSubmit}
          />
        )}

        {currentScreen === 'forgot_password' && (
          <ForgotPasswordScreen
            onBackToLogin={() => navigateTo('login')}
            onContinue={handleForgotPasswordEmailSubmit}
          />
        )}

        {currentScreen === 'verification' && (
          <VerificationScreen
            email={userEmail}
            verificationCode={verificationCode}
            onBack={() => navigateTo('forgot_password')}
            onVerifySuccess={handleVerificationSuccess}
            onResendCode={generateNewCode}
          />
        )}

        {currentScreen === 'create_new_password' && (
          <CreateNewPasswordScreen
            onBack={() => navigateTo('verification')}
            onSubmitSuccess={handlePasswordResetComplete}
          />
        )}
      </Animated.View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
