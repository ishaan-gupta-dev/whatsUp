import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import WhatsappLogo from '../assets/whatsapp-logo.png';
import {Colors} from '../theme/Colors';
import VectorIcon from '../utils/VectorIcon';
import {useNavigation} from '@react-navigation/native';
import {getImageURLfromFirebaseStorage} from '../utils/helper';
import {io} from 'socket.io-client';

let socket;

const ChatHeader = ({contactUserRef, chatId, userId}) => {
  const navigation = useNavigation();

  const [contact, setContact] = useState(null);
  // const [contact, setContact] = useState(null);

  const getContactData = async () => {
    const contactSnapshot = await contactUserRef.get();

    const data = contactSnapshot.data();

    data.profileUrl = await getImageURLfromFirebaseStorage(data.profile);
    setContact(data);
  };

  // useEffect(() => {
  //   getUserData()
  //     .then(res => setChatList(res))
  //     .catch(error => {
  //       console.log('Error in getChatList', error);
  //     });
  // }, [userId]);

  useEffect(() => {
    getContactData();
  }, [contactUserRef]);

  const joinRoom = () => {
    socket.emit('join-room', {
      roomId: chatId,
      userId: userId,
      userName: userName,
    });
  };
  useEffect(() => {
    // const API_URL = 'http://192.168.1.28:3000';
    // const API_URL = 'localhost:3000';
    // ngrock URL to get a public ip from localhost
    const API_URL = 'https://4428-49-249-150-178.ngrok-free.app';
    console.log('calling', API_URL);
    socket = io(`${API_URL}`);
    socket.on('connection', () => {
      console.log('connected');
    });
  }, []);

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
          onPress={joinRoom}
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
