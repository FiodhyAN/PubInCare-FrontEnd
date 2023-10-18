import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';

export default function AboutScreen() {
  const {isDark} = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#222' : '#fff',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDark ? '#DDD' : '#000',
      marginTop: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      color: isDark ? '#DDD' : '#000',
    },
    text: {
      fontSize: 16,
      marginBottom: 10,
      color: isDark ? '#DDD' : '#000',
    },
    thankYou: {
      fontSize: 18,
      marginTop: 20,
      marginBottom: 10,
      color: isDark ? '#DDD' : '#000',
    },
    getStarted: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      color: isDark ? '#DDD' : '#000',
    },
  });
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About PubInCare</Text>

      <Text style={styles.sectionTitle}>Our Mission</Text>
      <Text style={styles.text}>
        At PubInCare, we're on a mission to create safer and more vibrant
        communities by providing a platform for citizens to report and resolve
        problems with public infrastructure. We believe that together, we can
        make a positive impact on our neighborhoods and contribute to the
        overall well-being of our society.
      </Text>

      <Text style={styles.sectionTitle}>What We Do</Text>
      <Text style={styles.text}>
        PubInCare is a user-friendly mobile application that empowers you to
        report issues such as damaged roads, broken streetlights, potholes,
        graffiti, and other infrastructure problems. We make it easy for you to
        document these issues and submit reports directly to your local
        authorities.
      </Text>

      <Text style={styles.sectionTitle}>Key Features</Text>
      <Text style={styles.text}>
        - Report Issues: Use our simple interface to report infrastructure
        problems you encounter in your area. Include details, photos, and
        locations to provide a comprehensive view of the issue.
        {'\n'}- Track Progress: Stay informed about the status of your reports.
        Our system ensures that you're updated as your issue moves through the
        resolution process.
        {'\n'}- Community Engagement: Join a community of like-minded
        individuals dedicated to improving their surroundings. Discuss local
        issues and collaborate with others who share your passion for positive
        change.
        {'\n'}- Government Collaboration: We work closely with local government
        authorities to ensure your reports are addressed promptly and
        efficiently.
      </Text>

      <Text style={styles.sectionTitle}>Together, We Make a Difference</Text>
      <Text style={styles.text}>
        By using PubInCare, you become an active part of the solution. Together,
        we can beautify our neighborhoods, enhance safety, and build a stronger
        sense of community. Your reports matter, and with PubInCare, we ensure
        that your voice is heard.
      </Text>

      <Text style={styles.thankYou}>
        Thank you for being a part of the PubInCare community. Let's create a
        better and more connected world, one infrastructure issue at a time.
      </Text>

      <Text style={styles.getStarted}>Get Started Today</Text>
      <Text style={styles.text}>
        Download the PubInCare app and make a positive change in your community.
        Join us in creating a safer and more beautiful environment for everyone
        to enjoy.
      </Text>
    </ScrollView>
  );
}
