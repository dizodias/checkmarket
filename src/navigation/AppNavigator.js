import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/Market/WelcomeScreen';
import ManageProducts from '../screens/Market/ManageProducts';
import EditProduct from '../screens/Market/EditProduct';
import MyLists from '../screens/User/MyLists';
import CreateList from '../screens/User/CreateList';
import ListDetails from '../screens/User/ListDetails';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: true,
          headerTransparent: true,
          headerTintColor: '#1C1C1E',
          headerTitle: '',
          headerBackTitleVisible: false,
          cardStyle: { backgroundColor: '#fff' } 
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ManageProducts" component={ManageProducts} />
        <Stack.Screen name="EditProduct" component={EditProduct} options={{ presentation: 'modal', title: 'Editar' }} />
        <Stack.Screen name="MyLists" component={MyLists} />
        <Stack.Screen name="CreateList" component={CreateList} />
        <Stack.Screen name="ListDetails" component={ListDetails} options={{ title: 'Detalhes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}