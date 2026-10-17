import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'login'>('welcome');

  const handleSwipeUp = () => {
    setCurrentScreen('login');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const handleLogin = (email: string, pass: string) => {
    console.log('Login attempt:', email, pass);
  };

  return (
    <SafeAreaProvider>
      {currentScreen === 'welcome' ? (
        <WelcomeScreen onSwipeUp={handleSwipeUp} />
      ) : (
        <LoginScreen
          onBackToWelcome={handleBackToWelcome}
          onLoginPress={handleLogin}
          onSignUpPress={() => console.log('Sign up pressed')}
          onForgotPasswordPress={() => console.log('Forgot password pressed')}
        />
      )}
    </SafeAreaProvider>
  );
}

export default App;
