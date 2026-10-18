import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './src/screens/WelcomeScreen';

function App() {
  const handleLoginSubmit = (email: string, pass: string) => {
    console.log('Login submitted:', email, pass);
  };

  return (
    <SafeAreaProvider>
      <WelcomeScreen
        onLoginSubmit={handleLoginSubmit}
        onSignUpPress={() => console.log('Sign up pressed')}
        onForgotPasswordPress={() => console.log('Forgot password pressed')}
      />
    </SafeAreaProvider>
  );
}

export default App;
