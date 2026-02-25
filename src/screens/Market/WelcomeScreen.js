import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../../components/CustomButton';

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient colors={['#e0eafc', '#cfdef3']} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.logo}>CheckMarket</Text>
            <Text style={styles.subtitle}>Manage or buy.</Text>
        </View>

        <View style={styles.glassArea}>
            <Text style={styles.label}>Access as:</Text>
            <CustomButton title="I'm a Market (Admin)" onPress={() => navigation.navigate('ManageProducts')} color={['#1C1C1E', '#3A3A3C']} />
            <CustomButton title="I'm a Customer (User)" onPress={() => navigation.navigate('MyLists')} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { marginBottom: 40, alignItems: 'center' },
  logo: { fontSize: 36, fontWeight: '800', color: '#1C1C1E', letterSpacing: -1 },
  subtitle: { fontSize: 16, color: '#666', marginTop: 5 },
  glassArea: {
      backgroundColor: 'rgba(255,255,255,0.6)', padding: 24, borderRadius: 24,
      borderWidth: 1, borderColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10
  },
  label: { fontSize: 14, color: '#666', marginBottom: 10, textAlign: 'center', textTransform: 'uppercase' }
});