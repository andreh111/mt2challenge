import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import BottomNavigation from './src/navigation/BottomNav';
import {darkTheme} from './src/themes/dark';
import {lightTheme} from './src/themes/light';
import {ThemeContext} from './src/contexts/ThemeContext';
import i18n from 'i18n-js';
import {LocalizationContext} from './src/contexts/LocalizationContext';
import * as RNLocalize from 'react-native-localize';
import {en} from './src/locales/en';
import {ar} from './src/locales/ar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './src/contexts/AuthContext';
import messaging from '@react-native-firebase/messaging';



i18n.fallbacks = true;
i18n.translations = {en, ar};

export default function App() {

  const [loading, setLoading] = React.useState(true);
  const [theme, setTheme] = React.useState(lightTheme);
  const [locale, setLocale] = React.useState(
    RNLocalize.getLocales()[0].languageCode,
  );
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus == 0) {
      console.log('Permission status:', authorizationStatus);
      await messaging().requestPermission({
        sound: false,
        announcement: true,
        // ... other permission settings
      });
    }
  }

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    requestUserPermission();
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate('Home');
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        setLoading(false);
      });
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, {locale, ...options}),
      locale,
      setLocale,
    }),
    [locale],
  );

  const switchTheme = React.useCallback(
    (th) => {
      setTheme(th);
    },
    [theme],
  );

  let configIfAuthenticated = {
    screens: {
      Home: 'home',
      Profile: 'profile',
    },
  };
  let configIfNotAuthenticated = {
    screens: {
      Home: 'home',
      // in case of deep linking to profile while not signed in
      //he will be redirected to home to sign
    },
  };

  const linking = {
    prefixes: ["mt2://"],
    config: state.userToken ? configIfAuthenticated:configIfNotAuthenticated
  }

  

  return (
    <AuthContext.Provider value={{authContext, state}}>
      <LocalizationContext.Provider value={localizationContext}>
        <ThemeContext.Provider value={switchTheme}>
          <NavigationContainer linking={linking} theme={theme}>
            <BottomNavigation />
          </NavigationContainer>
        </ThemeContext.Provider>
      </LocalizationContext.Provider>
    </AuthContext.Provider>
  );
}
