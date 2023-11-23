import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChatList from '../components/ChatList';
import VectorIcon from '../utils/VectorIcon';
import {Colors} from '../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import {getDeviceId} from '../utils/helper';

const ChatListScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  console.log('userId in ChatListScreen', userId);

  const onNavigate = () => {
    navigation.navigate('ContactScreen', {
      userId: userId,
    });
  };

  useEffect(() => {
    getDeviceId().then(id => setUserId(id));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ChatList userId={userId} />
      </ScrollView>
      <TouchableOpacity style={styles.contactIcon} onPress={onNavigate}>
        <VectorIcon
          type="MaterialCommunityIcons"
          name="message-reply-text"
          size={22}
          color={Colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: Colors.background,
  },
  contactIcon: {
    backgroundColor: Colors.tertiary,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
export default ChatListScreen;
