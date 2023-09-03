import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CardView from '../component/CardView';
import axios from 'axios';
import {API} from '../config/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HistoryScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    noReportContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const [refreshing, setRefreshing] = React.useState(false);
  const [reports, setReports] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getReport = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        axios
          .get(API + 'reports?user=' + JSON.parse(value).id)
          .then(({data}) => {
            setIsLoading(false);
            setReports(data);
          })
          .catch(err => {
            setIsLoading(false);
            setReports([]);
            console.log(err.response.data.message);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    getReport();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getReport();
    }, []),
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {reports && reports.length !== 0 ? (
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#279EFF" />
          ) : (
            reports.map((report: any, index: number) => (
              <TouchableOpacity key={index} onPress={() => Alert.alert('Coming Soon')}>
                <CardView key={index} report={report} />
              </TouchableOpacity>
            ))
          )}
        </View>
      ) : (
        <View style={styles.noReportContainer}>
          <Text>Tidak ada laporan</Text>
        </View>
      )}
    </ScrollView>
  );
}
