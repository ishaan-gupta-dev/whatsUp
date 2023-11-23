import storage from '@react-native-firebase/storage';
import DeviceInfo from 'react-native-device-info';

export const getImageURLfromFirebaseStorage = async filepath => {
  try {
    console.log('filepath', filepath);
    const url = await storage().ref(filepath).getDownloadURL();
    console.log('url', url);
    return url;
  } catch (error) {
    console.log('Error in getImageURLfromFirebaseStorage', error);
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
