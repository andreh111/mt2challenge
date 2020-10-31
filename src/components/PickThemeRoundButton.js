import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Pressable, Text, View} from 'react-native';

const PickThemeRoundButton = ({radius, color, colorName, switchTheme}) => {
  const theme = useTheme();
  return (
    <View style={{alignItems: 'center'}}>
      <Pressable
        onPress={switchTheme}
        style={{
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
          backgroundColor: color,
          borderWidth: 3,
          borderColor: '#CCC',
          elevation: 2,
        }}
      />
      <Text style={{margin: 5, fontSize: 16,color: theme.colors.text}}>{colorName}</Text>
    </View>
  );
};

export default PickThemeRoundButton;
