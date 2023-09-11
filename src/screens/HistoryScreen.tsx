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
  TextInput,
} from 'react-native';
import CardView from '../component/CardView';
import axios from 'axios';
import {API} from '../config/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HistoryScreen({navigation}: any) {
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
    searhBar: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      elevation: 5,
      border: 1,
      borderColor: '#000',
      borderRadius: 10,
      marginHorizontal: 20,
      marginVertical: 15,
    },
    searchIcon: {
      position: 'absolute',
      right: 20,
      top: 15,
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

  const searchReport = async (search: string) => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        axios
          .get(API + 'reports?user=' + JSON.parse(value).id + '&search=' + search)
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
      <View style={styles.searhBar}>
        <TextInput
          placeholder='Search'
          style={{flex: 1}}
          onChangeText={text => {
            setIsLoading(true);
            searchReport(text)}}
        />
        <Icon name='search' size={20} color='#000' style={styles.searchIcon} />
      </View>
      {reports && reports.length !== 0 ? (
        <>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#279EFF" />
          ) : (
            reports.map((report: any, index: number) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('DetailLaporan', {
                reportId: report.id
              })}>
                <CardView key={index} report={report} />
              </TouchableOpacity>
            ))
          )}
        </View>
        </>
      ) : (
        <View style={styles.noReportContainer}>
          <Text>No Report Found</Text>
        </View>
      )}
    </ScrollView>
  );
}
