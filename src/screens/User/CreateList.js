import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import { getProducts, saveList, updateList } from '../../utils/storage';
import ProductCard from '../../components/ProductCard';
import CustomButton from '../../components/CustomButton';

export default function CreateList({ route, navigation }) {
  const listToEdit = route.params?.listToEdit;

  const [listName, setListName] = useState(listToEdit ? listToEdit.name : '');
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(listToEdit ? listToEdit.items : []);

  useEffect(() => {
      getProducts().then(setProducts);
  }, []);

  const toggleSelect = (product) => {
      if (selected.find(i => i.id === product.id)) {
          setSelected(selected.filter(i => i.id !== product.id));
      } else {
          setSelected([...selected, product]);
      }
  };

  const total = selected.reduce((acc, curr) => acc + parseFloat(curr.price), 0);

  const handleSave = async () => {
      if (!listName || selected.length === 0) return Alert.alert('Erro', 'Defina nome e itens.');
      
      const listData = { 
          id: listToEdit ? listToEdit.id : Date.now().toString(),
          name: listName, 
          items: selected, 
          total 
      };

      if (listToEdit) {
          await updateList(listData);
      } else {
          await saveList(listData);
      }
      navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.pageTitle}>{listToEdit ? 'Edit List' : 'New List'}</Text>
          <TextInput 
            style={styles.input} 
            placeholder="List Name (e.g. Weekly Groceries)" 
            value={listName} 
            onChangeText={setListName} 
          />
          <Text style={styles.totalBadge}>Total: US$ {total.toFixed(2)}</Text>
      </View>

      <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
              <ProductCard 
                item={item} 
                isMarketMode={false} 
                isSelected={selected.some(i => i.id === item.id)}
                onToggle={toggleSelect}
              />
          )}
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
      />
      
      <View style={styles.footer}>
          <CustomButton title={listToEdit ? "Save Changes" : `Create List (${selected.length})`} onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', paddingTop: 80 },
  header: { padding: 20, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginBottom: 10 },
  pageTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#1C1C1E' },
  input: { fontSize: 18, borderBottomWidth: 1, borderColor: '#ddd', marginBottom: 10, paddingVertical: 5 },
  totalBadge: { fontSize: 16, color: '#34C759', fontWeight: '700', marginTop: 5 },
  footer: { position: 'absolute', bottom: 20, left: 20, right: 20 }
});