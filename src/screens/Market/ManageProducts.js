import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert, Keyboard, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveProduct, getProducts, deleteProduct } from '../../utils/storage';
import ProductCard from '../../components/ProductCard';
import CustomButton from '../../components/CustomButton';
import { initialProducts } from '../../data/initialProducts';

export default function ManageProducts({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);
  const isFocused = useIsFocused();

  const loadData = async () => {
      let data = await getProducts();
      if (data.length === 0) {
          await AsyncStorage.setItem('@checkmarket_products', JSON.stringify(initialProducts));
          data = await getProducts();
      }
      setProducts(data);
  };

  useEffect(() => { if(isFocused) loadData(); }, [isFocused]);

  const confirmDelete = (id) => {
      if (Platform.OS === 'web') {
          if (window.confirm("Delete this product?")) {
              deleteProduct(id).then(loadData);
          }
      } else {
          Alert.alert("Delete Product", "Are you sure?", [
              { text: "Cancel" },
              { text: "Delete", onPress: async () => { await deleteProduct(id); loadData(); } }
          ]);
      }
  };

  const handleAdd = async () => {
      if (!name || !price) {
          Platform.OS === 'web' ? alert('Please fill all fields') : Alert.alert('Error', 'Please fill all fields');
          return;
      }
      const newP = { id: Date.now().toString(), name, price: price.replace(',', '.'), image: null };
      await saveProduct(newP);
      setName(''); setPrice('');
      if(Platform.OS !== 'web') Keyboard.dismiss();
      loadData();
  };

  return (
    <LinearGradient colors={['#F2F2F7', '#E5E5EA']} style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.headerArea}>
            <Text style={styles.headerTitle}>Manage Products</Text>
            <View style={styles.formGlass}>
                <TextInput style={styles.input} placeholder="Product Name" value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder="Price (R$)" value={price} onChangeText={setPrice} keyboardType="numeric" />
                <CustomButton title="Add Product" onPress={handleAdd} color={['#34C759', '#30B34D']} />
            </View>
        </View>

        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <ProductCard item={item} isMarketMode={true} onDelete={confirmDelete} />
            )}
            style={styles.list} 
            contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flex: 1, paddingTop: 80 },
  headerArea: { paddingHorizontal: 20 },
  headerTitle: { fontSize: 28, fontWeight: '700', marginBottom: 20, color: '#1C1C1E' },
  formGlass: { backgroundColor: 'rgba(255,255,255,0.8)', padding: 16, borderRadius: 20, marginBottom: 20, borderWidth: 1, borderColor: '#fff' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 10, fontSize: 16, borderWidth: 1, borderColor: '#E5E5EA' },
  list: { flex: 1 }
});