import React, { useState } from 'react';
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

  const generateNewCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setVerificationCode(code);
    return code;
  };

  const handleStartForgotPassword = () => {
    setCurrentScreen('forgot_password');
  };

  const handleForgotPasswordEmailSubmit = (email: string) => {
    setUserEmail(email);
    generateNewCode();
    setCurrentScreen('verification');
  };

  const handleVerificationSuccess = () => {
    setCurrentScreen('create_new_password');
  };

  const handlePasswordResetComplete = () => {
    setCurrentScreen('login');
  };

  const handleSignUpSubmit = (fullName: string, email: string) => {
    setUserEmail(email);
    generateNewCode();
    setCurrentScreen('verification');
  };

  return (
    <SafeAreaProvider>
      {currentScreen === 'get_started' && (
        <GetStartedScreen
          onGetStartedPress={() => setCurrentScreen('welcome')}
          onLoginPress={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onLoginSubmit={(email, pass) => console.log('Login:', email, pass)}
          onSignUpPress={() => setCurrentScreen('signup')}
          onForgotPasswordPress={handleStartForgotPassword}
        />
      )}

      {currentScreen === 'login' && (
        <LoginScreen
          onBackToWelcome={() => setCurrentScreen('welcome')}
          onSignUpPress={() => setCurrentScreen('signup')}
          onForgotPasswordPress={handleStartForgotPassword}
          onLoginPress={(email, pass) => console.log('Login:', email, pass)}
        />
      )}

      {currentScreen === 'signup' && (
        <SignUpScreen
          onBackToWelcome={() => setCurrentScreen('welcome')}
          onLoginPress={() => setCurrentScreen('login')}
          onSignUpSubmit={handleSignUpSubmit}
        />
      )}

      {currentScreen === 'forgot_password' && (
        <ForgotPasswordScreen
          onBackToLogin={() => setCurrentScreen('login')}
          onContinue={handleForgotPasswordEmailSubmit}
        />
      )}

      {currentScreen === 'verification' && (
        <VerificationScreen
          email={userEmail}
          verificationCode={verificationCode}
          onBack={() => setCurrentScreen('forgot_password')}
          onVerifySuccess={handleVerificationSuccess}
          onResendCode={generateNewCode}
        />
      )}

      {currentScreen === 'create_new_password' && (
        <CreateNewPasswordScreen
          onBack={() => setCurrentScreen('verification')}
          onSubmitSuccess={handlePasswordResetComplete}
        />
      )}
    </SafeAreaProvider>
  );
}

export default App;
