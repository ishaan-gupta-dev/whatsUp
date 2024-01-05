import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatBody from '../components/ChatBody';
import ChatFooter from '../components/ChatFooter';
import Wallpaper from '../assets/wallpaper.jpeg';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = props => {
  const {userId, contactId} = props.route.params;
  console.log('userId in chatScreen', userId);
  const generateChatId = () => {
    const sortUserIds = [userId, contactId].sort();
    const chatId = sortUserIds.join('_');
    return chatId;
  };

  const chatId = generateChatId();
  const chatRef = firestore().collection('chats').doc(chatId);
  const userRef = firestore().collection('users').doc(userId);
  const contactUserRef = firestore().collection('users').doc(contactId);

  const createChatRoom = async () => {
    const chatSnapShot = await chatRef.get();
    if (!chatSnapShot.exists) {
      const participants = [userRef, contactUserRef];
      await chatRef.set({participants});
    }
  };

  createChatRoom();
  return (
    <>
      {/* <Text>ChatScreen</Text> */}
      <ChatHeader
        contactUserRef={contactUserRef}
        chatId={chatId}
        userId={userId}
      />
      <ImageBackground source={Wallpaper} style={styles.wallPaper}>
        <ChatBody userId={userId} chatId={chatId} />
      </ImageBackground>
      <ChatFooter chatRef={chatRef} userId={userId} />
    </>
  );
};

const styles = StyleSheet.create({
  wallPaper: {
    height: '100%',
    flex: 1,
  },
});

export default ChatScreen;
