import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
    TouchableOpacity,
    Text,
} from 'react-native';

export default function SwitchLanguageButton({locale,setLocale}) {
    const theme = useTheme()
  return (
    <TouchableOpacity
      onPress={setLocale}
      style={{
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      }}>
      <Text
        style={{fontSize: 18, color: theme.colors.text, textDecorationLine: 'underline'}}>
        {locale}
      </Text>
    </TouchableOpacity>
  );
}
