import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {API} from '../config/API';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';

interface Report {
  no_laporan: string;
  created_at: string;
  lokasi: string;
  image_url: string;
  status: boolean;
  jenis_pengaduan: string;
  keluhan: string;
  nama_pengadu: string;
}
export default function DetailLaporanScreen({route}: any) {
  const id = route.params.reportId;

  const [report, setReport] = React.useState<Report | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const {isDark} = React.useContext(ThemeContext)

  const getReport = async () => {
    axios
      .get(API + 'reports/' + id)
      .then(res => {
        setReport(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getReport();
  }, []);

  if (report === null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isDark ? '#222' : '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const date = new Date(report.created_at);
  const options = {
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const,
  };
  const dateStr = date.toLocaleDateString('id-ID', options);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#222' : '#fff',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isDark ? '#DDD' : '#000',
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 10,
      marginBottom: 20,
    },
    labelText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDark ? '#DDD' : '#000',
    },
    bodyText: {
      fontSize: 16,
      marginBottom: 15,
      color: isDark ? '#DDD' : '#000',
    },
    statusText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: report.status === true ? 'green' : 'red',
    },
    button: {
      width: '100%',
      backgroundColor: isDark ? '#001F3F' : '#279EFF',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      marginBottom: 50,
      flexDirection: 'row',
      elevation: 5,
      border: 1,
      borderColor: '#000',
      marginVertical: 15,
    },
  });

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getReport} />
      }>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{report.no_laporan}</Text>
        <Image
          source={{uri: API + 'images/' + report.image_url}}
          style={styles.image}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flex: 1}}>
          <Text style={styles.labelText}>Jenis:</Text>
          <Text style={styles.bodyText}>{report.jenis_pengaduan}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.labelText}>Nama Pengadu:</Text>
          <Text style={styles.bodyText}>{report.nama_pengadu}</Text>
        </View>
      </View>
      <Text style={styles.labelText}>Lokasi:</Text>
      <Text style={styles.bodyText}>{report.lokasi}</Text>
      <Text style={styles.labelText}>Keluhan:</Text>
      <Text style={styles.bodyText}>{report.keluhan}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flex: 1}}>
          <Text style={styles.labelText}>Tanggal Laporan:</Text>
          <Text style={styles.bodyText}>{dateStr}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.labelText}>Status:</Text>
          {report.status === null ? (
            <Text style={styles.statusText}>
              <Icon name="clock-o" size={20} color="orange" /> Menunggu
            </Text>
          ) : report.status === true ? (
            <Text style={styles.statusText}>
              <Icon name="check" size={20} color="green" /> Diterima Sistem
            </Text>
          ) : (
            <Text style={styles.statusText}>
              <Icon name="times" size={20} color="red" /> Ditolak Sistem
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Coming Soon', 'Fitur ini akan segera hadir');
        }}
        style={styles.button}>
        <Text style={{color: isDark ? '#DDD' : '#fff', fontSize: 16, fontWeight: 'bold'}}>
          Cek Status
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
