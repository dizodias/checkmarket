import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getLists, deleteList } from '../../utils/storage';
import CustomButton from '../../components/CustomButton';

export default function MyLists({ navigation }) {
  const [lists, setLists] = useState([]);
  const isFocused = useIsFocused();

  const load = async () => {
      const data = await getLists();
      const dataWithId = data.map((l, i) => ({...l, id: l.id || `${Date.now()}-${i}` }));
      setLists(dataWithId);
  };

  useEffect(() => { if(isFocused) load(); }, [isFocused]);

  const handleDelete = (id) => {
      if (Platform.OS === 'web') {
          if (window.confirm("Delete this list?")) {
              deleteList(id).then(load);
          }
      } else {
          Alert.alert("Delete List", "Are you sure?", [
              { text: "Cancel" },
              { text: "Delete", onPress: async () => { await deleteList(id); load(); } }
          ]);
      }
  };

  return (
    <LinearGradient colors={['#F2F2F7', '#E5E5EA']} style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.headerArea}>
            <Text style={styles.title}>My Lists</Text>
            <CustomButton title="+ New List" onPress={() => navigation.navigate('CreateList')} />
        </View>

        <FlatList
            data={lists}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    style={styles.listCard}
                    onPress={() => navigation.navigate('ListDetails', { list: item })}
                >
                    <View style={{flex: 1}}>
                        <Text style={styles.listName}>{item.name}</Text>
                        <Text style={styles.listTotal}>R$ {parseFloat(item.total).toFixed(2)}</Text>
                        <Text style={styles.itemCount}>{item.items.length} itens</Text>
                    </View>
                    
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={() => navigation.navigate('CreateList', { listToEdit: item })} style={styles.btnIcon}>
                            <Ionicons name="pencil" size={20} color="#007AFF" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.btnIcon, {backgroundColor: '#ffe5e5'}]}>
                            <Ionicons name="trash" size={20} color="#FF3B30" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
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
  headerArea: { paddingHorizontal: 20, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 10, color: '#1C1C1E' },
  listCard: {
      backgroundColor: '#fff', padding: 20, borderRadius: 16, marginBottom: 12,
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      ...Platform.select({
          web: { boxShadow: '0px 4px 10px rgba(0,0,0,0.05)' },
          default: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 }
      })
  },
  listName: { fontSize: 18, fontWeight: '600', color: '#1C1C1E' },
  listTotal: { fontSize: 16, color: '#34C759', fontWeight: 'bold', marginTop: 4 },
  itemCount: { fontSize: 12, color: '#999', marginTop: 2 },
  actions: { flexDirection: 'row', gap: 10 },
  btnIcon: { padding: 10, backgroundColor: '#F2F2F7', borderRadius: 10 },
  list: { flex: 1 }
});