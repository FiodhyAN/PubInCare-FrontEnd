import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PelaporanScreen from '../screens/PelaporanScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();
export default function PelaporanNavigation() {
  const {isDark} = React.useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Report Form"
      screenOptions={{
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: isDark ? '#DDD' :'#fff',
        headerShown: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: isDark ? '#DDD' : '#fff',
        },
        headerStyle: {
          backgroundColor: isDark ? '#001F3F' :'#00BFFF',
        },
        tabBarStyle: {
          backgroundColor: isDark ? '#001F3F' :'#00BFFF',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="arrow-left" // Choose the appropriate icon for your back button
              size={30}
              style={{marginLeft: 15, color: isDark ? '#DDD' :'#fff'}}
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
