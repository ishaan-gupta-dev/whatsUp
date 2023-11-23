import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import WhatsappLogo from '../assets/whatsapp-logo.png';
import {Colors} from '../theme/Colors';
import VectorIcon from '../utils/VectorIcon';
import {useNavigation} from '@react-navigation/native';
import {getImageURLfromFirebaseStorage} from '../utils/helper';

const ChatHeader = ({contactUserRef}) => {
  const navigation = useNavigation();

  const [contact, setContact] = useState(null);
  // console.log('contact', contact);
  const getContactData = async () => {
    const contactSnapshot = await contactUserRef.get();
    // console.log('contactSnapshot in Header', contactSnapshot);
    const data = contactSnapshot.data();
    // console.log('data in Header', data);
    data.profileUrl = await getImageURLfromFirebaseStorage(data.profile);
    setContact(data);
  };

  useEffect(() => {
    getContactData();
  }, [contactUserRef]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <VectorIcon
          name="arrow-back"
          type="Ionicons"
          size={24}
          color={Colors.white}
          onPress={() => navigation.goBack()}
        />
        {contact && (
          <>
            <Image
              source={{uri: contact.profileUrl}}
              style={styles.profilePhoto}
            />
            <Text style={styles.username}>{contact.name}</Text>
          </>
        )}
      </View>
      <View style={styles.innerContainer}>
        <VectorIcon
          name="videocam"
          type="Ionicons"
          size={24}
          color={Colors.white}
        />
        <VectorIcon
          type="Ionicons"
          name="call"
          color={Colors.white}
          size={24}
          style={styles.iconStyle}
        />
        <VectorIcon
          type="Entypo"
          name="dots-three-vertical"
          color={Colors.white}
          size={18}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePhoto: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  username: {
    fontSize: 17,
    color: Colors.white,
    marginLeft: 10,
  },
  iconStyle: {
    marginHorizontal: 25,
  },
});

export default ChatHeader;
