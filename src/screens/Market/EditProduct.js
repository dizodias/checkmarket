import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { updateProduct } from '../../utils/storage';
import CustomButton from '../../components/CustomButton';

export default function EditProduct({ route, navigation }) {
  const { product } = route.params;
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const handleSave = async () => {
      await updateProduct({ ...product, name, price });
      navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Product</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
      <CustomButton title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#F2F2F7' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15 }
});