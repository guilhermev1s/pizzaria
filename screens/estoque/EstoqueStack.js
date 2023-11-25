import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Estoque from './Estoque';
import EstoqueForm from './EstoqueForm';

const Stack = createNativeStackNavigator();

const EstoqueStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="estoque" component={Estoque} options={{ title: 'Estoque' }} />
            <Stack.Screen name="estoque-Formulário" component={EstoqueForm} options={{ title: 'Estoque' }} />
        </Stack.Navigator>
    )
}

export default EstoqueStack