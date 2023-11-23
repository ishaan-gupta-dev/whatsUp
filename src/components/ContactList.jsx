import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ContactListData} from '../data/ContactListData';
import {Colors} from '../theme/Colors';
import firestore from '@react-native-firebase/firestore';
import {getImageURLfromFirebaseStorage} from '../utils/helper';
import {useNavigation} from '@react-navigation/native';

const ContactList = ({userId}) => {
  const navigation = useNavigation();
  const [contactList, setContactList] = useState([]);
  console.log('contactList', contactList);
  const getContactListFromFireStore = async () => {
    const contactCollection = await firestore().collection('users').get();

    const contactListData = Promise.all(
      contactCollection.docs.map(async item => {
        const id = item.id;
        const name = item.data().name;
        const profileURL = await getImageURLfromFirebaseStorage(
          item.data().profile,
        );
        return {
          id,
          name,
          profileURL,
        };
      }),
    );
    // console.log('contactListData', contactListData);
    return contactListData;
  };
  useEffect(() => {
    getContactListFromFireStore()
      .then(res => {
        console.log('res', res);
        setContactList(res);
      })
      .catch(error => {
        console.log('error in getContactListFromFireStore', error);
      });
  }, []);

  const onNavigate = (userId, contactId) => {
    navigation.navigate('ChatScreen', {
      userId: userId,
      contactId: contactId,
    });
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Contacts on Whatsapp</Text> */}
      {contactList.map(item => (
        <>
          {item.id == userId ? (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.contactContainer}
                onPress={() => onNavigate(userId, item.id)}>
                <Image
                  source={{uri: item.profileURL}}
                  style={styles.imgStyleSelf}
                />
                <Text style={styles.username}>You ({item.name})</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.contactContainer}
                onPress={() => onNavigate(userId, item.id)}>
                <Image
                  source={{uri: item.profileURL}}
                  style={styles.imgStyle}
                />
                <Text style={styles.username}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* <View key={item.id}>
          <TouchableOpacity
            style={styles.contactContainer}
            onPress={() => onNavigate(userId, item.id)}>
            <Image source={{uri: item.profileURL}} style={styles.imgStyle} />
            <Text style={styles.username}>{item.name}</Text>
          </TouchableOpacity>
        </View> */}
        </>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 16,
    flex: 1,
  },
  imgStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  imgStyleSelf: {
    height: 40,
    width: 40,
    borderRadius: 50,
    tintColor: 'gray',
  },
  username: {
    fontSize: 16,
    color: Colors.textColor,
    marginLeft: 15,
  },
  title: {
    fontSize: 12,
    color: Colors.textGrey,
    marginVertical: 5,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
});

export default ContactList;
