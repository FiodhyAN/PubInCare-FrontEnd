import React from 'react';
import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native';
import {API} from '../config/API';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemeContext} from '../context/ThemeContext';

export default function CardView({report}: any) {
  const {isDark} = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    card: {
      width: '100%',
      backgroundColor: isDark ? '#001F3F' : '#279EFF',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      marginBottom: 8,
      flexDirection: 'row',
    },
    cardTitle: {
      color: isDark ? '#DDD' : '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    cardLokasi: {
      color: isDark ? '#DDD' : '#fff',
      fontSize: 10,
      marginBottom: 5,
    },
    cardText: {
      color: isDark ? '#DDD' : '#fff',
      fontSize: 13,
    },
    textContainer: {
      flex: 1,
      marginLeft: 10,
    },
  });

  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <View style={styles.card}>
      {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <></>}
      <Image
        source={{uri: API + 'images/' + report.image_url}}
        style={{width: 100, height: 100, borderRadius: 10}}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{report.no_laporan}</Text>
        <Text style={styles.cardLokasi}>{report.lokasi}</Text>
        {report.status === null ? (
          <Text style={styles.cardText}>
            Status: <Icon name="clock-o" size={15} color="#fff" /> Menunggu
          </Text>
        ) : report.status === true ? (
          <Text style={styles.cardText}>
            Status: <Icon name="check" size={15} color="#fff" /> Diterima
          </Text>
        ) : (
          <Text style={styles.cardText}>
            Status: <Icon name="times" size={15} color="#fff" /> Ditolak
          </Text>
        )}
      </View>
    </View>
  );
}
