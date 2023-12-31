import storage from '@react-native-firebase/storage';
import DeviceInfo from 'react-native-device-info';

export const getImageURLfromFirebaseStorage = async filepath => {
  try {
    const url = await storage().ref(filepath).getDownloadURL();
    return url;
  } catch (error) {
    throw error;
  }
};

export const getDeviceId = () => {
  try {
    const uniqueId = DeviceInfo.getUniqueId();
    return uniqueId;
  } catch (error) {
    console.log('Error in getDeviceId', error);
    throw error;
  }
};
