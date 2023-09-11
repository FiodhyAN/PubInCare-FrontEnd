import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PelaporanScreen from '../screens/PelaporanScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
export default function PelaporanNavigation() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Report Form"
      screenOptions={{
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#fff',
        headerShown: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#fff',
        },
        headerStyle: {
          backgroundColor: '#00BFFF',
        },
        tabBarStyle: {
          backgroundColor: '#00BFFF',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="arrow-left" // Choose the appropriate icon for your back button
              size={30}
              style={{marginLeft: 15, color: '#fff'}}
            />
          </TouchableOpacity>
        ),
      }}>
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Report Form"
        component={PelaporanScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="form-textbox"
              color={color}
              size={size}
            />
          ),
        }}
        initialParams={{initialRoute: true}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
