import {View, Text, Image, StyleSheet, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import WhatsappLogo from '../assets/whatsapp-logo.png';
import {Colors} from '../theme/Colors';
import VectorIcon from '../utils/VectorIcon';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const ChatFooter = ({userId, chatRef}) => {
  const [message, setMessage] = useState(null);
  const [sendEnable, setSendEnable] = useState(false);

  const onChange = value => {
    if (value.trim() == '') {
      setMessage(value);
      setSendEnable(false);
    } else {
      setMessage(value);
      setSendEnable(true);
    }
  };

  const onSend = () => {
    chatRef.collection('messages').add({
      body: message,
      sender: userId,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
    setMessage('');
    setSendEnable(false);
    // Alert.alert(`Message Sent - ${message}`);
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.row}>
          <VectorIcon
            name="emoji-emotions"
            type="MaterialIcons"
            size={24}
            color={Colors.white}
            //   onPress={() => navigation.goBack()}
          />
          <TextInput
            placeholder="Message"
            placeholderTextColor={Colors.textGrey}
            style={styles.inputStyle}
            onChangeText={value => onChange(value)}
            value={message}></TextInput>
        </View>
        <View style={styles.row}>
          <VectorIcon
            name="attachment"
            type="Entypo"
            size={24}
            color={Colors.white}
          />
          {!sendEnable && (
            <>
              <VectorIcon
                name="currency-rupee"
                type="MaterialIcons"
                size={24}
                color={Colors.white}
                style={styles.iconStyle}
                //   onPress={() => navigation.goBack()}
              />
              <VectorIcon
                name="camera"
                type="Entypo"
                size={24}
                color={Colors.white}
                style={styles.iconStyle}
                //   onPress={() => navigation.goBack()}
              />
            </>
          )}
        </View>
      </View>
      <View style={styles.rightContainer}>
        {sendEnable ? (
          <VectorIcon
            name="send"
            type="MaterialCommunityIcons"
            size={24}
            color={Colors.white}
            onPress={onSend}
          />
        ) : (
          <VectorIcon
            name="microphone"
            type="FontAwesome"
            size={24}
            color={Colors.white}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    width: '85%',
    flexDirection: 'row',
    backgroundColor: Colors.primaryColor,
    borderRadius: 30,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    marginHorizontal: 5,
  },
  inputStyle: {
    fontSize: 17,
    color: Colors.white,
    marginLeft: 5,
    // width: '50%',
  },
  username: {
    fontSize: 17,
    color: Colors.white,
    marginLeft: 10,
  },
  rightContainer: {
    backgroundColor: Colors.teal,
    padding: 10,
    borderRadius: 50,
  },
});

export default ChatFooter;
