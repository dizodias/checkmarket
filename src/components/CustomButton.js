import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CustomButton({ title, onPress, color = ['#007AFF', '#0055FF'] }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.touchable}>
      <LinearGradient colors={color} style={styles.gradient} start={{x:0, y:0}} end={{x:1, y:1}}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 14,
    ...Platform.select({
      web: { boxShadow: '0px 4px 10px rgba(0,0,0,0.2)' },
      default: { 
         shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 3.84, shadowOffset: { width: 0, height: 2 },
         elevation: 0
      }
    })
  },
  gradient: {
    padding: 16, borderRadius: 14, alignItems: 'center',
    elevation: 3
  },
  text: { color: '#fff', fontSize: 16, fontWeight: '600', letterSpacing: 0.5 }
});