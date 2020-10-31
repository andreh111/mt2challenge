import React from 'react';
import {View, Text, Button,Alert} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {LocalizationContext} from '../contexts/LocalizationContext';
import FingerprintScanner from 'react-native-fingerprint-scanner';

export default function HomeScreen() {
  const {t, locale, setLocale} = React.useContext(LocalizationContext);
  const {authContext, state} = React.useContext(AuthContext);

  const handleSignIn = () => {
    FingerprintScanner
      .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
      .then(() => {
        authContext.signIn({user: 'andreh'});
      })
      .catch((error) => {
        authContext.signIn({user: 'andreh'});
      });
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {state.userToken == null ? (
        <Button title={t('sign_in')} onPress={() => handleSignIn()} />
      ) : (
        <>
        <Text style={{fontSize: 26,margin: 5,fontWeight:'200'}}>Welcome Anonymous</Text>
        <Button title={t('sign_out')} onPress={() => authContext.signOut()} />
        </>
        
      )}
    </View>
  );
}
