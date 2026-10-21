import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './src/screens/WelcomeScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import CreateNewPasswordScreen from './src/screens/CreateNewPasswordScreen';

type ScreenName = 'welcome' | 'forgot_password' | 'verification' | 'create_new_password';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('welcome');
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
    setCurrentScreen('welcome');
  };

  return (
    <SafeAreaProvider>
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onLoginSubmit={(email, pass) => console.log('Login:', email, pass)}
          onSignUpPress={() => console.log('Sign up pressed')}
          onForgotPasswordPress={handleStartForgotPassword}
        />
      )}

      {currentScreen === 'forgot_password' && (
        <ForgotPasswordScreen
          onBackToLogin={() => setCurrentScreen('welcome')}
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
