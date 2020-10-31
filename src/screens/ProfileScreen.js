import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image,Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  roundFrame: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#A8A8A8',
    alignItems: 'center',
    justifyContent: 'center',
    top: '25%',
    backgroundColor: '#FAFAFA',
    opacity: 0.7
  },
  roundImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#A8A8A8',
    alignItems: 'center',
    justifyContent: 'center',
    top: '25%',
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: '#A8A8A8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function ProfileScreen() {
  const [image, setImage] = React.useState();
  const ProfileImagePick = () => {
    return image ? (
      <>
      <View
        style={styles.roundImage}>
        <Image source={image} style={styles.img} />
        <Icon style={{position:'absolute'}} onPress={()=> pickImage()} name="person-add-outline" size={50} color={"white"}/>

      </View>
      </>
    ) : (
      <View style={styles.roundFrame}>
        <Icon
          name="person-add-outline"
          size={50}
          color={'grey'}
          onPress={() => {
            pickImage();
          }}
        />
        <Text style={{fontSize: 18}}>Choose Profile</Text>
      </View>
    );
  };
  const pickImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.2,
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage(response)
      }
    });
  };
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 33.8938,
          longitude: 35.5018,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView>
      {ProfileImagePick(image)}
    </View>
  );
}

//  import React, {useState} from 'react';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import styles from '../../styles/profile/stylePersonDetailScreen';
// import storage from '@react-native-firebase/storage';
// import firestore from '@react-native-firebase/firestore';
// import {Image, View} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import ImagePicker from 'react-native-image-picker';
// import AuthContext from '../../context/authContext';
// export default () => {
//   const [image, setImage] = useState(null);
//   const [token, setToken] = React.useState('');
//   const [name, setName] = useState('');
//   const {signIn} = React.useContext(AuthContext);

// const UploadImage = async (path) => {
//   // let {uri} = image;
//   let rnd = Math.random() * 7687626383;
//   const ref = storage()
//     .ref('profile_pictures')
//     .child(rnd + '');
//   await ref.putFile(path);

//   let url = await storage().ref(`profile_pictures/${rnd}`).getDownloadURL();

//   firestore()
//     .collection('users')
//     .doc(token)
//     .update({
//       profile_picture: url,
//     })
//     .then(() => {
//       console.log('User updated!');
//     });

//   console.log(url);
// };

// const UpdateProfile = async () => {
//   let userId = await AsyncStorage.getItem('userToken');
//   firestore()
//     .collection('users')
//     .doc(userId)
//     .update({
//       name: name,
//     })
//     .then(() => {
//       signIn({userId});
//     });
// };
// const getProfile = async () => {
//   let userId = await AsyncStorage.getItem('userToken');
//   setToken(userId);
//   firestore()
//     .collection('users')
//     .doc(userId)
//     .get()
//     .then((documentSnapshot) => {
//       if (documentSnapshot.exists) {
//         let userdata = documentSnapshot.data();
//         console.log(userdata);
//         if (userdata.name) {
//           setName(userdata.name);
//         }
//         if (userdata.profile_picture) {
//           setImage({uri: userdata.profile_picture});
//         }
//       }
//     });
// };
