import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Funcionario from './Funcionario';
import FuncionarioForm from './FuncionarioForm';

const Stack = createNativeStackNavigator();

const FuncionarioStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="funcionario" component={Funcionario} options={{ title: 'Funcionario' }} />
            <Stack.Screen name="funcionario-Formulário" component={FuncionarioForm} options={{ title: 'Funcionario' }} />
        </Stack.Navigator>
    )
}

export default FuncionarioStack