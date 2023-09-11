import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FormData from 'form-data';
import { API } from '../config/API';

export default function PelaporanScreen({navigation}: any) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    inputContainer: {
      marginVertical: 10,
      marginHorizontal: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      fontWeight: 'bold',
    },
    input: {
      fontSize: 16,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 10,
    },
    mapIcon: {
      position: 'absolute',
      right: 10,
      top: 35,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
    },
    fotoButton: {
      backgroundColor: '#279eff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
      marginRight: 10,
    },
    kirimButton: {
      backgroundColor: '#279eff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonFotoText: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
    },
    buttonKirimText: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
    },
    fotoContainer: {
      marginHorizontal: 20,
      alignItems: 'center',
    },
    foto: {
      width: 200,
      height: 200,
      marginTop: 10,
    },
    lokasiText: {
      fontSize: 16,
      marginBottom: 5,
    },
  });

  const getUserId = async () => {
    const value = await AsyncStorage.getItem('user');
    if (value !== null) {
      setUserId(JSON.parse(value).id);
      setNama(JSON.parse(value).name);
    }
  };

  React.useEffect(() => {
    getUserId();
  }, []);

  const resetForm = () => {
    getUserId();
    setLokasi({
      latitude: 0,
      longitude: 0,
      address: '',
    });
    setKeluhan('');
    setJenis('');
    setFoto('');
    if (jenisDropdownRef.current) {
      jenisDropdownRef.current.reset();
    }
  };

  const imagePicker = () => {
    Alert.alert('Silahkan Pilih Foto', '', [
      {
        text: 'Batal',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Kamera',
        onPress: () =>
          launchCamera({mediaType: 'photo'}, response => {
            if (response.assets && response.assets.length > 0) {
              const selectedUri = response.assets[0].uri;
              if (selectedUri) {
                setFoto(selectedUri);
              } else {
                Alert.alert('Error', 'Selected URI is undefined.');
              }
            } else {
              console.log('No assets selected.');
            }
          }),
      },
      {
        text: 'Galeri',
        onPress: () =>
          launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: false,
            },
            response => {
              if (response.assets && response.assets.length > 0) {
                const selectedUri = response.assets[0].uri;
                if (selectedUri) {
                  setFoto(selectedUri);
                } else {
                  Alert.alert('Error', 'Selected URI is undefined.');
                }
              } else {
                console.log('No assets selected.');
              }
            },
          ),
      },
    ]);
  };

  function updateLokasi(newLocation: any) {
    setLokasi(newLocation);
  }

  function create_report() {
    const filename = foto.split('/').pop();
    const fileExtension = filename?.split('.').pop();
    const validExtensions = ['jpg', 'jpeg', 'png'];
    
    if (!validExtensions.includes(fileExtension?.toLowerCase() || '')) {
      Alert.alert('Error', 'File yang diupload harus berupa gambar.');
      return;
    }
    let data = new FormData();
    data.append('user_id', userId);
    data.append('nama_pengadu', nama);
    data.append('jenis_pengaduan', jenis);
    data.append('keluhan', keluhan);
    data.append('lokasi', lokasi.address);
    data.append('image_url', {
      uri: foto,
      name: filename,
      type: `image/${fileExtension?.toLowerCase()}`,
    });

    axios.post(`${API}/reports/store`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      resetForm();
      setIsLoading(false);
      Alert.alert('Terima Kasih', res.data.message);
    })
    .catch(err => {
      setIsLoading(false);
      console.log(err.response.data)
    })
  }

    

  const [userId, setUserId] = React.useState(0);
  const [nama, setNama] = React.useState('');
  const [jenis, setJenis] = React.useState('');
  const [lokasi, setLokasi] = React.useState({
    latitude: 0,
    longitude: 0,
    address: '',
  });
  const [keluhan, setKeluhan] = React.useState('');
  const [foto, setFoto] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);

  const jenisDropdownRef = React.useRef<SelectDropdown>(null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Nama"
          value={nama}
          onChangeText={setNama}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Jenis Pengaduan</Text>
        <SelectDropdown
          ref={jenisDropdownRef}
          data={['Perbaikan', 'Pengadaan']}
          onSelect={selectedItem => {
            setJenis(selectedItem);
          }}
          defaultButtonText={'Pilih Jenis Pengaduan'}
          defaultValue={jenis !== '' ? jenis : 'Pilih Jenis Pengaduan'}
          buttonStyle={{
            borderRadius: 5,
            borderColor: '#ccc',
            borderWidth: 1,
            paddingVertical: 8,
            paddingHorizontal: 10,
            width: '100%',
          }}
          buttonTextStyle={{
            fontSize: 16,
            color: '#000',
          }}
          dropdownStyle={{
            backgroundColor: '#fff',
          }}
          rowStyle={{
            backgroundColor: '#fff',
            borderBottomColor: '#ccc',
          }}
          rowTextStyle={{
            fontSize: 16,
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Lokasi</Text>
        {lokasi.address !== '' ? <Text style={styles.lokasiText}>{lokasi.address}</Text> : null}
        <Button
          title="Pilih Lokasi"
          onPress={() => {
            navigation.navigate('Map', {
              updateLokasi: updateLokasi,
              latitude: lokasi.latitude,
              longitude: lokasi.longitude,
              address: lokasi.address,
            });
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{jenis === 'Perbaikan' ? 'Keluhan' : 'Kebutuhan'}</Text>
        <TextInput
          style={styles.input}
          value={keluhan}
          onChangeText={setKeluhan}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          placeholder={jenis === 'Perbaikan' ? 'Masukkan Keluhan' : 'Masukkan Kebutuhan'}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.fotoButton}
          onPress={() => {
            imagePicker();
          }}>
          <Text style={styles.buttonFotoText}>Pilih Foto</Text>
        </TouchableOpacity>
      </View>
      {foto !== '' ? (
        <View style={styles.fotoContainer}>
          <Image source={{uri: foto}} style={styles.foto} />
        </View>
      ) : null}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.kirimButton}
          onPress={() => {
            setIsLoading(true);
            if (
              nama === '' ||
              jenis === '' ||
              lokasi.address === '' ||
              keluhan === '' ||
              foto === ''
            ) {
              const errorMessages = [];

              if (nama === '') {
                errorMessages.push('Nama Lengkap harus diisi');
              }
              if (jenis === '') {
                errorMessages.push('Jenis Pengaduan harus diisi');
              }
              if (lokasi.address === '') {
                errorMessages.push('Lokasi harus diisi');
              }
              if (keluhan === '') {
                errorMessages.push('Keluhan harus diisi');
              }
              if (foto === '') {
                errorMessages.push('Foto harus diisi');
              }

              Alert.alert('Error', errorMessages.join('\n'));
            } else {
              create_report();
              return;
            }
            
          }}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonKirimText}>Kirim</Text>
            )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
