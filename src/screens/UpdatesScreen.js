import React, {useState, useEffect} from 'react';
import {ActivityIndicator, FlatList, View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';

export default function UpdatesScreen() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  const theme = useTheme()

  useEffect(() => {
    const subscriber = firestore()
      .collection('updates')
      .onSnapshot((querySnapshot) => {
        const users = [];

        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  // ...
  return (
    <SafeAreaView style={{flex:1}}>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <View
            style={{
              height: 80,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:'blue',
              marginTop:0.7
            }}>
            <Text style={{color:'white',fontSize: 20}}>{item.content}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
