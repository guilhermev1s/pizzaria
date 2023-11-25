import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import PagamentosForm from './PagamentosForm';
import Pagamentos from './Pagamentos';

const Stack = createNativeStackNavigator();

const pagamentoStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="pagamentos" component={Pagamentos} options={{ title: 'Pagamentos' }} />
    <Stack.Screen name="pagamentos-Formulário" component={PagamentosForm} options={{ title: 'Pagamentos' }} />
</Stack.Navigator>
  )
}

export default pagamentoStack