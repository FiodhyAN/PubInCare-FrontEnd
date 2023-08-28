import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LogBox } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MapScreen({ navigation, route }: any) {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });

  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const [location, setLocation] = React.useState('');
  const mapRef = React.useRef<MapView>(null);

  React.useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setLatitude(info.coords.latitude);
      setLongitude(info.coords.longitude);
      getLocationAddress();
    });
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={updateAndGoBack}
          style={{
            marginRight: 10,
          }}>
          <Text style={{ color: 'white' }}>Pilih Lokasi</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, updateAndGoBack]);
  

  function getCurrentLocation() {
    Geolocation.getCurrentPosition(info => {
      const latitude = info.coords.latitude;
      const longitude = info.coords.longitude;

      setLatitude(latitude);
      setLongitude(longitude);
      getLocationAddress();

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
      }
    });
  }

  async function getLocationAddress() {
    const response = await fetch(
      'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + latitude + '&lon=' + longitude,
    );
    const json = await response.json();

    setLocation(json.display_name);
  }

  function updateAndGoBack() {
    if (route.params && route.params.updateLokasi) {
      route.params.updateLokasi(location); // Pass the new location to the callback
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 1,
        }}
        onPress={getCurrentLocation}>
        <Icon name="crosshairs-gps" size={20} color="white" />
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={'Your Location'}
          description={location}
          draggable={true}
          onDragEnd={e => {
            setLatitude(e.nativeEvent.coordinate.latitude);
            setLongitude(e.nativeEvent.coordinate.longitude);
            getLocationAddress();
          }}
        />
      </MapView>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          position: 'absolute',
          bottom: 10,
        }}
        onPress={() => updateAndGoBack()}>
        <Text style={{ color: 'white' }}>Pilih Lokasi</Text>
      </TouchableOpacity>
    </View>
  );
}
