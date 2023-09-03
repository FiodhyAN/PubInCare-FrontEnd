import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { API } from '../config/API'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CardView({report}: any) {
    const styles = StyleSheet.create({
        card: {
            width: '100%',
            backgroundColor: '#279EFF',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            marginBottom: 8,
            flexDirection: 'row',
        },
        cardTitle: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 5,
        },
        cardLokasi: {
            color: '#fff',
            fontSize: 10,
            marginBottom: 5,
        },
        cardText: {
            color: '#fff',
            fontSize: 13,
        },
        textContainer: {
            flex: 1,
            marginLeft: 10,
        }
    })
  return (
    <View style={styles.card}>
        <Image source={{ uri: API + 'images/' + report.image_url }} style={{width: 100, height: 100, borderRadius: 10}} />
        <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{report.no_laporan}</Text>
            <Text style={styles.cardLokasi}>{report.lokasi}</Text>
            {report.status === null ? (
                <Text style={styles.cardText}>Status: <Icon name="clock-o" size={15} color="#fff" /> Menunggu</Text>
            ) : report.status === 1 ? (
                <Text style={styles.cardText}>Status: <Icon name="check" size={15} color="#fff" /> Diterima</Text>
            ) : (
                <Text style={styles.cardText}>Status: <Icon name="times" size={15} color="#fff" /> Ditolak</Text>
            )}
        </View>
    </View>
  )
}
