import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import WhatsappLogo from '../assets/whatsapp-logo.png';
import {Colors} from '../theme/Colors';
import VectorIcon from '../utils/VectorIcon';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={WhatsappLogo} style={styles.logoStyle} />
      <View style={styles.headerIcons}>
        <VectorIcon
          type="Feather"
          name="camera"
          color={Colors.secondaryColor}
          size={22}
        />
        <VectorIcon
          type="Ionicons"
          name="search"
          color={Colors.secondaryColor}
          size={20}
          style={styles.iconStyle}
        />
        <VectorIcon
          type="Entypo"
          name="dots-three-vertical"
          color={Colors.secondaryColor}
          size={18}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerIcons: {
    display: 'flex',
    flexDirection: 'row',
  },
  logoStyle: {
    height: 25,
    width: 110,
  },
  iconStyle: {
    marginHorizontal: 25,
  },
});

export default Header;
