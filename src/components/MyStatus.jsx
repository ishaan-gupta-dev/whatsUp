import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import User1 from '../assets/user1.jpeg';
import {Colors} from '../theme/Colors';
import VectorIcon from '../utils/VectorIcon';
const MyStatus = () => {
  return (
    <View>
      {/* <Text>MyStatus</Text> */}
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={User1} style={styles.myStatusImage} />
          <View style={styles.plusIcon}>
            <VectorIcon
              name="pluscircle"
              type="AntDesign"
              color={Colors.tertiary}
              size={20}
            />
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.myStatusText}>My Status</Text>
          <Text style={styles.myStatusSubText}>Tap to add status update</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  myStatusImage: {
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  leftContainer: {
    position: 'relative',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: 50,
    height: 20,
    width: 20,
  },
  rightContainer: {
    marginLeft: 15,
  },
  myStatusText: {
    fontWeight: '500',
    fontSize: 15,
  },
  myStatusSubText: {
    fontSize: 13,
    paddingTop: 5,
    color: Colors.textGrey,
  },
});

export default MyStatus;
