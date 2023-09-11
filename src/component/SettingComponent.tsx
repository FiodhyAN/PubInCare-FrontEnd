import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SettingComponent(props: any) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    iconContainer: {
      backgroundColor: '#279EFF',
      borderRadius: 10,
      padding: 10,
    },
    iconStyle: {
      color: '#fff',
      fontSize: 24,
    },
    textContainer: {
      flex: 1,
      marginLeft: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
    },
    subtitle: {
      fontSize: 14,
      color: '#757575',
    },
    arrowIcon: {
      color: '#279EFF',
      fontSize: 24,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={props.icon} style={styles.iconStyle} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.heading}</Text>
        <Text style={styles.subtitle}>{props.subheading}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
      <View>
        <Icon name="arrow-right" style={styles.arrowIcon} />
      </View>
    </View>
  );
}
