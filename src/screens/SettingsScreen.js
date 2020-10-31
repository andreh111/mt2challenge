import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {ThemeContext} from '../contexts/ThemeContext';
import PickThemeRoundButton from '../components/PickThemeRoundButton';
import {darkTheme} from '../themes/dark';
import {lightTheme} from '../themes/light';
import {customTheme} from '../themes/custom_theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import { LocalizationContext } from '../contexts/LocalizationContext';
import SwitchLanguageButton from '../components/SwitchLanguageButton';
export default function SettingsScreen() {
  const switchTheme = React.useContext(ThemeContext);
  const { t, locale, setLocale } = React.useContext(LocalizationContext);
  const theme = useTheme();
  return (
    <SafeAreaView>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 22,
          fontWeight: '900',
          marginTop: 20,
          textAlign: 'center',
        }}>
        {t('theme_settings')}
      </Text>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 16,
          fontWeight: '200',
          margin: 10,
          textAlign: 'center',
        }}>
        {t('change_theme_title')}
      </Text>
      <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
        <PickThemeRoundButton
          switchTheme={() => switchTheme(darkTheme)}
          colorName={'Dark Theme'}
          radius={25}
          color={'black'}
        />
        <PickThemeRoundButton
          switchTheme={() => switchTheme(lightTheme)}
          colorName={'White Theme'}
          radius={25}
          color={'white'}
        />
        <PickThemeRoundButton
          switchTheme={() => switchTheme(customTheme)}
          colorName={'Red Theme'}
          radius={25}
          color={'red'}
        />
      </View>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 22,
          fontWeight: '900',
          marginTop: 20,
          textAlign: 'center',
        }}>
        {t('language_settings')}
      </Text>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 16,
          fontWeight: '200',
          margin: 10,
          textAlign: 'center',
        }}>
        {t('change_lang_title')}
      </Text>

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 20,
        }}>
        {locale === 'en' && (<SwitchLanguageButton locale="AR" setLocale={()=>setLocale('ar')}/>)}
        {locale === 'ar' && (<SwitchLanguageButton locale="EN" setLocale={()=>setLocale('en')}/>)}
      </View>
    </SafeAreaView>
  );
}
