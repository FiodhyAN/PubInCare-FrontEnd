import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ProgressSteps, {
  Title,
  Content,
} from '@joaosousa/react-native-progress-steps';
import {ThemeContext} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {API} from '../config/API';

export default function StatusScreen({route}: any) {
  const [jenisLaporan, setJenisLaporan] = React.useState('');
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    axios
      .get(API + '/reports/' + route.params.reportId + '/status')
      .then(({data}) => {
        console.log(data);
        setJenisLaporan(data.jenis_pengaduan);
        if (data.jenis_pengaduan === 'Perbaikan') {
          if (
            data.status === 'Menunggu Admin' ||
            data.status === 'Diterima Sistem'
          ) {
            setStep(1);
          }
          if (data.status === 'Diterima Admin') {
            setStep(2);
          }
          if (data.status === 'Dijalankan') {
            setStep(3);
          }
        }
        if (data.jenis_pengaduan === 'Pengadaan') {
          if (data.status === 'Menunggu Admin') {
            setStep(0);
          }
          if (data.status === 'Diterima Admin') {
            setStep(1);
          }
          if (data.status === 'Dijalankan') {
            setStep(2);
          }
        }
      });
  });
  const {isDark} = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#222' : '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 50,
      paddingHorizontal: 20,
    },
    statusImageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    statusImage: {
      width: 150,
      height: 150,
    },
    statusTextContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    statusText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#DDD' : '#000',
    },
    chatAdminContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    chatAdminButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#279EFF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    chatAdminText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
  });

  if (jenisLaporan === 'Perbaikan') {
    return (
      <View style={styles.container}>
        <ProgressSteps
          currentStep={step}
          steps={[
            {
              id: 0,
              title: <Title>Laporan Diterima</Title>,
              content: (
                <Content>
                  <View style={styles.statusImageContainer}>
                    <Image
                      source={require('../assets/images/waiting.png')}
                      style={styles.statusImage}
                    />
                  </View>
                  <View style={styles.statusTextContainer}>
                    <Text style={styles.statusText}>
                      Laporan Disetujui Sistem
                    </Text>
                  </View>
                  <View style={styles.chatAdminContainer}>
                    <TouchableOpacity
                      style={styles.chatAdminButton}
                      onPress={() => Alert.alert('Hubungi Admin')}>
                      <Icon name="comments" size={20} color="#fff" />
                      <Text style={styles.chatAdminText}> Hubungi Admin</Text>
                    </TouchableOpacity>
                  </View>
                </Content>
              ),
            },
            {
              id: 1,
              title: <Title>Laporan Disetujui Sistem</Title>,
              content: (
                <Content>
                  <View style={styles.statusImageContainer}>
                    <Image
                      source={require('../assets/images/acc_sistem.png')}
                      style={styles.statusImage}
                    />
                  </View>
                  <View style={styles.statusTextContainer}>
                    <Text style={styles.statusText}>
                      Laporan Disetujui Sistem
                    </Text>
                  </View>
                  <View style={styles.chatAdminContainer}>
                    <TouchableOpacity
                      style={styles.chatAdminButton}
                      onPress={() => Alert.alert('Hubungi Admin')}>
                      <Icon name="comments" size={20} color="#fff" />
                      <Text style={styles.chatAdminText}> Hubungi Admin</Text>
                    </TouchableOpacity>
                  </View>
                </Content>
              ),
            },
            {
              id: 2,
              title: <Title>Laporan Disetujui Admin</Title>,
              content: (
                <Content>
                  <View style={styles.statusImageContainer}>
                    <Image
                      source={require('../assets/images/acc_admin.png')}
                      style={styles.statusImage}
                    />
                  </View>
                  <View style={styles.statusTextContainer}>
                    <Text style={styles.statusText}>
                      Laporan Disetujui Admin
                    </Text>
                  </View>
                  <View style={styles.chatAdminContainer}>
                    <TouchableOpacity
                      style={styles.chatAdminButton}
                      onPress={() => Alert.alert('Hubungi Admin')}>
                      <Icon name="comments" size={20} color="#fff" />
                      <Text style={styles.chatAdminText}> Hubungi Admin</Text>
                    </TouchableOpacity>
                  </View>
                </Content>
              ),
            },
            {
              id: 3,
              title: <Title>Laporan Dijalankan</Title>,
              content: (
                <Content>
                  <View style={styles.statusImageContainer}>
                    <Image
                      source={require('../assets/images/working.png')}
                      style={styles.statusImage}
                    />
                  </View>
                  <View style={styles.statusTextContainer}>
                    <Text style={styles.statusText}>
                      Laporan Dijalankan
                    </Text>
                  </View>
                  <View style={styles.chatAdminContainer}>
                    <TouchableOpacity
                      style={styles.chatAdminButton}
                      onPress={() => Alert.alert('Hubungi Admin')}>
                      <Icon name="comments" size={20} color="#fff" />
                      <Text style={styles.chatAdminText}> Hubungi Admin</Text>
                    </TouchableOpacity>
                  </View>
                </Content>
              ),
            },
          ]}
          orientation="horizontal"
          colors={{
            title: {
              text: {
                normal: isDark ? '#DDD' : '#000',
                active: isDark ? '#DDD' : '#000',
                completed: isDark ? '#DDD' : '#000',
              },
            },
            marker: {
              text: {
                normal: '#94d2bd',
                active: isDark ? '#DDD' : '#279EFF',
                completed: '#f4f3ee',
              },
              line: {
                normal: '#94d2bd',
                active: isDark ? '#001F3F' : '#279EFF',
                completed: isDark ? '#001F3F' : '#279EFF',
              },
            },
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ProgressSteps
          currentStep={step}
          steps={[
            {
              id: 0,
              title: <Title>Laporan Diterima</Title>,
              content: (
                <Content>
                  <View style={styles.statusImageContainer}>
                    <Image
                      source={require('../assets/images/waiting.png')}
                      style={styles.statusImage}
                    />
                  </View>
                  <View style={styles.statusTextContainer}>
                    <Text style={styles.statusText}>
                      Menunggu Persetujuan Admin
                    </Text>
                  </View>
                  <View style={styles.chatAdminContainer}>
                    <TouchableOpacity
                      style={styles.chatAdminButton}
                      onPress={() => Alert.alert('Hubungi Admin')}>
                      <Icon name="comments" size={20} color="#fff" />
                      <Text style={styles.chatAdminText}> Hubungi Admin</Text>
                    </TouchableOpacity>
                  </View>
                </Content>
              ),
            },
            {
              id: 1,
              title: <Title>Laporan Disetujui Admin</Title>,
              content: (
                <Content>
                  <View style={styles.statusImageContainer}>
                    <Image
                      source={require('../assets/images/acc_admin.png')}
                      style={styles.statusImage}
                    />
                  </View>
                  <View style={styles.statusTextContainer}>
                    <Text style={styles.statusText}>
                      Laporan Disetujui Sistem
                    </Text>
                  </View>
                  <View style={styles.chatAdminContainer}>
                    <TouchableOpacity
                      style={styles.chatAdminButton}
                      onPress={() => Alert.alert('Hubungi Admin')}>
                      <Icon name="comments" size={20} color="#fff" />
                      <Text style={styles.chatAdminText}> Hubungi Admin</Text>
                    </TouchableOpacity>
                  </View>
                </Content>
              ),
            },
            {
              id: 2,
              title: <Title>Laporan Dijalankan</Title>,
              content: (
                <Content>
                  <View style={styles.statusImageContainer}>
                    <Image
                      source={require('../assets/images/working.png')}
                      style={styles.statusImage}
                    />
                  </View>
                  <View style={styles.statusTextContainer}>
                    <Text style={styles.statusText}>
                      Laporan Dijalankan
                    </Text>
                  </View>
                  <View style={styles.chatAdminContainer}>
                    <TouchableOpacity
                      style={styles.chatAdminButton}
                      onPress={() => Alert.alert('Hubungi Admin')}>
                      <Icon name="comments" size={20} color="#fff" />
                      <Text style={styles.chatAdminText}> Hubungi Admin</Text>
                    </TouchableOpacity>
                  </View>
                </Content>
              ),
            },
          ]}
          orientation="horizontal"
          colors={{
            title: {
              text: {
                normal: isDark ? '#DDD' : '#000',
                active: isDark ? '#DDD' : '#000',
                completed: isDark ? '#DDD' : '#000',
              },
            },
            marker: {
              text: {
                normal: '#94d2bd',
                active: isDark ? '#DDD' : '#279EFF',
                completed: '#f4f3ee',
              },
              line: {
                normal: '#94d2bd',
                active: isDark ? '#001F3F' : '#279EFF',
                completed: isDark ? '#001F3F' : '#279EFF',
              },
            },
          }}
        />
      </View>
    );
  }
}
