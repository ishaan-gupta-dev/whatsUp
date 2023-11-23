import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {MessagesData} from '../data/MessagesData';
import {Colors} from '../theme/Colors';
import VectorIcon from '../utils/VectorIcon';
import firestore from '@react-native-firebase/firestore';

const ChatBody = ({userId, chatId}) => {
  const scrollViewRef = useRef();
  // const userId = '1jdfnvchjkd';

  const [messages, setMessages] = useState([]);
  console.log('messages ==============', messages);
  const [enableScrollToBottomIcon, setEnableScrollToBottomIcon] =
    useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        const allMessages = snapshot.docs.map(snap => {
          // console.log('snap', snap);
          return snap.data();
        });
        setMessages(allMessages);
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const UserMessageView = ({message, time, index}) => {
    console.log('index UserMessageView', index);
    return (
      <View style={styles.userContainer} key={index}>
        <View style={styles.userInnerContainer}>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.time}>{time}</Text>
          <VectorIcon
            name="check-double"
            type="FontAwesome5"
            color={Colors.blue}
            size={12}
            style={styles.doubleCheck}
          />
        </View>
      </View>
    );
  };

  const OtherUserMessageView = ({message, time, index}) => {
    console.log('index OtherUserMessageView', index);
    return (
      <View style={styles.otherUserContainer} key={index}>
        <View style={styles.otherUserInnerContainer}>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    );
  };

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({animated: true});
    // setEnableScrollToBottomIcon(false);
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    );
  };

  const isCloseToTop = ({layoutMeasurement, contentOffset, contentSize}) => {
    return contentOffset.y == 0;
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={scrollToBottom}
        onScroll={({nativeEvent}) => {
          setEnableScrollToBottomIcon(true);
          if (isCloseToTop(nativeEvent)) {
            //do something
          }
          if (isCloseToBottom(nativeEvent)) {
            //do something
            setEnableScrollToBottomIcon(false);
          }
        }}>
        {messages.map((item, index) => (
          <>
            {item.sender === userId ? (
              <UserMessageView
                message={item.body}
                time={item.timestamp?.toDate().toDateString()}
                index={index}
              />
            ) : (
              <OtherUserMessageView
                message={item.body}
                time={item.timestamp?.toDate().toDateString()}
                index={index}
              />
            )}
          </>
        ))}
      </ScrollView>

      {enableScrollToBottomIcon ? (
        <View style={styles.scrollDownArrowContainer}>
          <View style={styles.scrollDownArrow}>
            <VectorIcon
              name="angle-dobule-down"
              type="Fontisto"
              size={12}
              color={Colors.white}
              onPress={scrollToBottom}
            />
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  otherUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  userInnerContainer: {
    backgroundColor: Colors.teal,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  message: {
    fontSize: 13,
    color: Colors.white,
  },
  time: {
    fontSize: 9,
    color: Colors.white,
    marginLeft: 5,
  },
  doubleCheck: {
    marginLeft: 5,
  },
  otherUserInnerContainer: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  scrollDownArrow: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 50,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollDownArrowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
});

export default ChatBody;
