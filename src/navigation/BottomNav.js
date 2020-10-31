import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Tabs
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UpdatesScreen from '../screens/UpdatesScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import {LocalizationContext} from '../contexts/LocalizationContext';
import { AuthContext } from '../contexts/AuthContext';
const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  const {locale} = React.useContext(LocalizationContext);
  const {state,authContext} = React.useContext(AuthContext);
  const theme = useTheme();
  if (locale == 'ar') {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: theme.colors.primary,
        }}>
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'الاعدادات',
            tabBarIcon: ({color, size}) => (
              <Icon name="tools" color={color} size={size} />
            ),
          }}
        />
        {state.userToken && <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'الملف',
            tabBarIcon: ({color, size}) => (
              <Icon name="account" color={color} size={size} />
            ),
          }}
        />}
        <Tab.Screen
          name="Notifications"
          component={UpdatesScreen}
          options={{
            tabBarLabel: 'الاخبار',
            tabBarIcon: ({color, size}) => (
              <Icon name="bell" color={color} size={size} />
            ),
          }}
        />
        

        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'الرئيسية',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={UpdatesScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" color={color} size={size} />
          ),
        }}
      />
      {state.userToken && <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />}
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <Icon name="tools" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
