import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import User1 from '../assets/user1.jpeg';
import {Colors} from '../theme/Colors';
import VectorIcon from '../utils/VectorIcon';
import {ChatListData} from '../data/ChatListData';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {getImageURLfromFirebaseStorage} from '../utils/helper';

const ChatList = ({userId}) => {
  const navigation = useNavigation();

  const onNavigate = contactId => {
    navigation.navigate('ChatScreen', {
      userId: userId,
      contactId: contactId,
    });
  };

  const [chatList, setChatList] = useState([]);

  // Get User data from user data with reference of chats
  const getChatList = async () => {
    const userRef = await firestore().collection('users').doc(userId);

    const allChatDoc = await firestore()
      .collection('chats')
      .where('participants', 'array-contains', userRef)
      .get();

    const chatData = await Promise.all(
      allChatDoc.docs.map(async chatDoc => {
        const data = chatDoc.data();

        const participants = await Promise.all(
          data.participants
            .filter(item => {
              return item.id != userId;
            })
            .map(async user => {
              const userDoc = await user.get();
              const userData = await userDoc.data();
              const id = user?.id;
              const name = userData?.name;
              const profileUrl = await getImageURLfromFirebaseStorage(
                userData?.profile,
              );
              return {id, name, profileUrl};
            }),
        );
        const chatDocRef = chatDoc.ref;
        const lastMessageDoc = await chatDocRef
          .collection('messages')
          .orderBy('timestamp', 'desc')
          .limit(1)
          .get();
        const lastMessage = lastMessageDoc?.docs?.length
          ? lastMessageDoc.docs[0].data()
          : {};
        return {
          lastMessage,
          otherUser: participants[0],
        };
      }),
    );
    return chatData;
  };
  useEffect(() => {
    getChatList()
      .then(res => setChatList(res))
      .catch(error => {
        console.log('Error in getChatList', error);
      });
  }, [userId]);

  return (
    <>
      {chatList.map((item, index) => (
        <View key={index}>
          {item.otherUser && item.lastMessage && (
            <View key={item.otherUser.id}>
              <TouchableOpacity
                style={styles.container}
                onPress={() => onNavigate(item.otherUser.id)}>
                <View style={styles.leftContainer}>
                  <Image
                    source={{uri: item.otherUser.profileUrl}}
                    style={styles.profileImg}
                  />
                  <View>
                    <Text style={styles.username}>{item.otherUser.name}</Text>
                    <Text style={styles.text}>{item.lastMessage.body}</Text>
                  </View>
                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.timeStamp}>
                    {item.lastMessage.timestamp.toDate().toDateString()}
                  </Text>
                  {item.mute && (
                    <VectorIcon
                      type="MaterialCommunityIcons"
                      name="volume-variant-off"
                      size={22}
                      style={styles.muteIcon}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  profileImg: {
    borderRadius: 50,
    height: 40,
    width: 40,
    marginRight: 15,
  },
  leftContainer: {
    flexDirection: 'row',
  },
  username: {
    color: Colors.textColor,
    fontSize: 14,
  },
  text: {
    color: Colors.textGrey,
    fontSize: 14,
  },
  timeStamp: {
    color: Colors.textGrey,
    fontSize: 12,
  },
  muteIcon: {
    marginTop: 5,
    marginLeft: 20,
  },
});

export default ChatList;
