import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Fornecedor from './Fornecedor';
import FornecedorForm from './FornecedorForm';

const Stack = createNativeStackNavigator();

const FornecedorStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="fornecedor" component={Fornecedor} options={{ title: 'Fornecedor' }} />
            <Stack.Screen name="fornecedor-Formulário" component={FornecedorForm} options={{ title: 'Fornecedor' }} />
        </Stack.Navigator>
    )
}

export default FornecedorStack