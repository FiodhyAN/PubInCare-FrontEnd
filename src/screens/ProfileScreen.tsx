import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Switch,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import SettingComponent from '../component/SettingComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext,} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import FormData from 'form-data';
import {API} from '../config/API';
import { ThemeContext } from '../context/ThemeContext';

export default function ProfileScreen({navigation}:any) {
  const {logout} = React.useContext(AuthContext);
  const {isDark, toggleTheme} = React.useContext(ThemeContext);
  const [user, setUser] = React.useState<any>(null);
  const [foto, setFoto] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [themeModal, setThemeModal] = React.useState<boolean>(false);

  const getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
      setFoto(API + 'profile_image/' + JSON.parse(user).profile_image);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  if (user === null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const uploadProfilePicture = (foto: string) => {
    const filename = foto.split('/').pop();
    const fileExtension = filename?.split('.').pop();
    const validExtensions = ['jpg', 'jpeg', 'png'];

    if (!validExtensions.includes(fileExtension?.toLowerCase() || '')) {
      Alert.alert('Error', 'File yang diupload harus berupa gambar.');
      return;
    }

    let formData = new FormData();
    formData.append('profile_image', {
      uri: foto,
      name: filename,
      type: `image/${fileExtension?.toLowerCase()}`,
    });
    formData.append('id', user.id);
    axios
      .post(API + 'profile_image/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async res => {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({...user, profile_image: res.data.profile_image}),
        );
        setUser({...user, profile_image: res.data.profile_image});
        setFoto(API + 'profile_image/' + res.data.profile_image);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const selectImage = (mediaType: any, setImage: any) => {
    launchImageLibrary({mediaType, includeBase64: false}, response => {
      handleImageResponse(response);
    });
  };

  const handleImageResponse = (response: any) => {
    if (response.assets && response.assets.length > 0) {
      const selectedUri = response.assets[0].uri;
      if (selectedUri) {
        setIsLoading(true);
        uploadProfilePicture(selectedUri);
      } else {
        Alert.alert('Error', 'Selected URI is undefined.');
      }
    } else {
      console.log('No assets selected.');
    }
  };

  const imagePicker = () => {
    Alert.alert('Change Profile Picture', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Camera',
        onPress: () =>
          launchCamera({mediaType: 'photo'}, response =>
            handleImageResponse(response),
          ),
      },
      {
        text: 'Gallery',
        onPress: () => selectImage('photo', setFoto),
      },
    ]);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000' : '#fff',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    darkContainer: {
      flex: 1,
      backgroundColor: '#222',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    profileContainer: {
      alignItems: 'center',
      paddingBottom: 20,
    },
    avatarImage: {
      height: 120,
      width: 120,
      borderRadius: 60,
      marginBottom: 20,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
      color: isDark ? '#DDD' : '#000',
    },
    userEmail: {
      fontSize: 16,
      color: '#757575',
      marginTop: 5,
    },
    settingSection: {
      marginTop: 20,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDark ? '#DDD' : '#000',
    },
    logoutBtn: {
      backgroundColor: '#FF5733', // Your desired background color
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
      marginBottom: 30,
      marginHorizontal: 120,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconLogout: {
      fontSize: 15,
      color: '#fff', // Text color
      marginRight: 5, // Spacing between icon and text
    },
    textLogout: {
      fontSize: 15,
      color: '#fff', // Text color
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    modalItemText: {
      fontSize: 18,
    },
    closeButton: {
      backgroundColor: '#f44',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    closeButtonText: {
      fontSize: 16,
      color: '#fff',
    },
  });

  return (
    <ScrollView style={[styles.container, isDark && styles.darkContainer]}>
      <View style={styles.profileContainer}>
        {isLoading ? (
          <ActivityIndicator animating={isLoading} size={60} color="#000" />
        ) : (
          <TouchableOpacity onPress={() => imagePicker()}>
            <Image
              source={
                foto
                  ? {uri: foto}
                  : require('../assets/images/default_profile.jpg')
              }
              style={styles.avatarImage}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.settingSection}>
        <Modal animationType="slide" transparent={true} visible={themeModal}>
          <TouchableWithoutFeedback onPress={() => setThemeModal(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Theme</Text>
                </View>
                <View style={styles.modalItem}>
                  <Text style={styles.modalItemText}>
                    <Icon name="moon-o" style={{fontSize: 20}} /> Dark Mode
                  </Text>
                  <Switch
                    value={isDark}
                    onValueChange={toggleTheme}
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    ios_backgroundColor="#3e3e3e"
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Text style={styles.sectionHeader}>Settings</Text>
        <TouchableOpacity onPress={() => Alert.alert('Coming Soon!')}>
          <SettingComponent
            icon="account"
            heading="Edit Profile"
            subheading="Update your details"
            subtitle="Change Password"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setThemeModal(true)}>
          <SettingComponent
            icon="cog"
            heading="Theme"
            subheading="Customize your app's theme"
            subtitle="Permissions"
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.settingSection, {marginBottom: 20}]}>
        <Text style={styles.sectionHeader}>Other Options</Text>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <SettingComponent
            icon="information"
            heading="About"
            subheading="Learn more about the app"
            subtitle="Contact Support"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'OK', onPress: () => logout()},
            ],
            {cancelable: false},
          );
        }}>
        <View style={styles.buttonContent}>
          <Icon name="sign-out" style={styles.iconLogout} />
          <Text style={styles.textLogout}>Logout</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
