import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import pagamentoStack from './screens/pagamentos/pagamentoStack';
import ClientesStack from './screens/clientes/ClientesStack';
import EstoqueStack from './screens/estoque/EstoqueStack';
import FornecedorStack from './screens/fornecedor/FornecedorStack';
import FuncionarioStack from './screens/funcionario/FuncionarioStack';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator>
          <Tab.Screen
              name="Clientes"
              component={ClientesStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="account-multiple" size={26} />
                ),
              }}
            />

          <Tab.Screen
              name="Estoque"
              component={EstoqueStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="barcode-scan" size={26} />
                ),
              }}
            />

          <Tab.Screen
              name="Fornecedor"
              component={FornecedorStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="map-marker" size={26} />
                ),
              }}
            />

          <Tab.Screen
              name="Funcionário"
              component={FuncionarioStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="badge-account" size={26} />
                ),
              }}
            />

          <Tab.Screen
              name="Pagamentos"
              component={pagamentoStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="bank" size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}


