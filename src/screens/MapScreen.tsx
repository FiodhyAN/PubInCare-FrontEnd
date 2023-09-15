import Geolocation from '@react-native-community/geolocation';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, LogBox} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MapScreen({navigation, route}: any) {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      width: '100%', // Use percentage for responsiveness
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    crosshairsButton: {
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
    },
    selectLocationButton: {
      width: '90%',
      height: 50,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      position: 'absolute',
      bottom: 10,
    },
    buttonText: {
      color: 'white',
    },
  });

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    address: '',
  });
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [markers, setMarkers] = useState({
    latitude: 0,
    longitude: 0,
  }); // <-- Add this line

  const mapRef = React.useRef<MapView>(null);

  useEffect(() => {
    if (
      route.params &&
      route.params.latitude == 0 &&
      route.params.longitude == 0
    ) {
      Geolocation.getCurrentPosition(
        info => {
          const {latitude, longitude} = info.coords;
          setRegion({
            ...region,
            latitude,
            longitude,
          });
          getLocationAddress(latitude, longitude);
          setMarkers({
            ...markers,
            latitude,
            longitude,
          });
        },
        error => console.error('Error getting location:', error),
      );
    } else {
      setRegion({
        ...region,
        latitude: route.params.latitude,
        longitude: route.params.longitude,
      });
      setLocation({
        ...location,
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        address: route.params.address,
      });
      setMarkers({
        ...markers,
        latitude: route.params.latitude,
        longitude: route.params.longitude,
      });
    }
  }, []);

  function getCurrentLocation() {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;

        setRegion({
          ...region,
          latitude,
          longitude,
        });
        getLocationAddress(latitude, longitude);

        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          });
        }
      },
      error => console.error('Error getting location:', error),
    );
  }

  async function getLocationAddress(latitude: number, longitude: number) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      );
      const json = await response.json();
      const NewerLocation = {
        latitude,
        longitude,
        address: json.display_name,
      };
      setLocation(NewerLocation);
    } catch (error) {
      console.error('Error getting location address:', error);
    }
  }

  function updateAndGoBack() {
    if (route.params && route.params.updateLokasi) {
      route.params.updateLokasi(location); // Pass the new location to the callback
    }
    navigation.goBack();
  }
  console.log(markers)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.crosshairsButton}
        onPress={getCurrentLocation}>
        <Icon name="crosshairs-gps" size={20} color="white" />
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onPress={e => {
          const {latitude, longitude} = e.nativeEvent.coordinate;
          setMarkers({
            ...markers,
            latitude,
            longitude,
          });
          getLocationAddress(latitude, longitude);
        }}
        >
        <Marker
          coordinate={{ 
            latitude: markers.latitude,
            longitude: markers.longitude,
           }}
          title={'Your Location'}
          description={location.address}
          draggable={true}
          onDragEnd={e => {
            const {latitude, longitude} = e.nativeEvent.coordinate;
            setRegion({
              ...region,
              latitude,
              longitude,
            });
            getLocationAddress(latitude, longitude);
          }}
        />
      </MapView>
      <TouchableOpacity
        style={styles.selectLocationButton}
        onPress={updateAndGoBack}>
        <Text style={styles.buttonText}>Pilih Lokasi</Text>
      </TouchableOpacity>
    </View>
  );
}
