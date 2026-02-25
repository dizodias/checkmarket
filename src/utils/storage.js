import AsyncStorage from '@react-native-async-storage/async-storage';

// --- PRODUCTS ---

export const saveProduct = async (newProduct) => {
  try {
    const existing = await getProducts();
    const updated = [...existing, newProduct];
    await AsyncStorage.setItem('@checkmarket_products', JSON.stringify(updated));
  } catch (e) { console.error(e); }
};

export const getProducts = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@checkmarket_products');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) { return []; }
};

export const deleteProduct = async (id) => {
    try {
        const existing = await getProducts();
        const filtered = existing.filter(p => p.id !== id);
        await AsyncStorage.setItem('@checkmarket_products', JSON.stringify(filtered));
    } catch (e) { console.error(e); }
};

export const updateProduct = async (editedProduct) => {
    try {
        const existing = await getProducts();
        const updated = existing.map(p => p.id === editedProduct.id ? editedProduct : p);
        await AsyncStorage.setItem('@checkmarket_products', JSON.stringify(updated));
    } catch (e) { console.error(e); }
};

// --- BUY LIST ---

export const saveList = async (newList) => {
    try {
        const existing = await getLists();
        const updated = [...existing, newList];
        await AsyncStorage.setItem('@checkmarket_lists', JSON.stringify(updated));
    } catch (e) { console.error(e); }
};

export const getLists = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@checkmarket_lists');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) { return []; }
};

export const updateList = async (updatedList) => {
    try {
        const existing = await getLists();
        const newLists = existing.map(l => l.id === updatedList.id ? updatedList : l);
        await AsyncStorage.setItem('@checkmarket_lists', JSON.stringify(newLists));
    } catch (e) { console.error(e); }
};

export const deleteList = async (listId) => {
    try {
        const existing = await getLists();
        const filtered = existing.filter(l => l.id !== listId);
        await AsyncStorage.setItem('@checkmarket_lists', JSON.stringify(filtered));
    } catch (e) { console.error(e); }
};