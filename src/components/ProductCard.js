import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductCard({ item, onDelete, isMarketMode, isSelected, onToggle }) {
  
  const hasImage = typeof item.image === 'string' && item.image.startsWith('http');

  return (
    <TouchableOpacity 
      activeOpacity={onToggle ? 0.7 : 1} 
      onPress={onToggle ? () => onToggle(item) : null}
      style={[styles.card, isSelected && styles.cardSelected]}
    >
      {hasImage ? (
        <Image 
            source={{ uri: item.image }} 
            style={styles.image} 
            resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
            <Ionicons name="basket" size={24} color="#ccc" />
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>US$ {parseFloat(item.price).toFixed(2)}</Text>
      </View>
      
      {isMarketMode && (
        <View style={styles.actions}>
            <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.btnAction}>
                <Ionicons name="trash" size={20} color="#FF3B30" />
            </TouchableOpacity>
        </View>
      )}

      {onToggle && isSelected && (
          <Ionicons name="checkmark-circle" size={24} color="#34C759" style={{marginLeft: 10}} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 12, marginVertical: 6, borderRadius: 16,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  cardSelected: { backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#34C759', borderWidth: 1.5 },
  image: {
      width: 50, height: 50, borderRadius: 10, marginRight: 15,
      backgroundColor: '#f0f0f0'
  },
  placeholder: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5E5EA' },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: '#1C1C1E' },
  price: { fontSize: 14, color: '#666', marginTop: 4 },
  actions: { flexDirection: 'row', gap: 10 },
  btnAction: { padding: 8, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 8 }
});