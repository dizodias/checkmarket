import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProductCard from '../../components/ProductCard';

export default function ListDetails({ route }) {
  const { list } = route.params;

  return (
    <LinearGradient colors={['#F2F2F7', '#E5E5EA']} style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.total}>Total: R$ {parseFloat(list.total).toFixed(2)}</Text>
        </View>

        <FlatList
            data={list.items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <ProductCard item={item} isMarketMode={false} />
            )}
            contentContainerStyle={{paddingBottom: 20}}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flex: 1, padding: 20, paddingTop: 80 },
  header: { marginBottom: 20, paddingBottom: 20, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontSize: 28, fontWeight: '800', color: '#1C1C1E' },
  total: { fontSize: 20, color: '#34C759', fontWeight: '600', marginTop: 5 }
});