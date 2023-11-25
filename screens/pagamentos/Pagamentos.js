import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { Button, Card, Dialog, FAB, IconButton, Portal, Text } from 'react-native-paper';

const Pagamentos = ({navigation}) => {
    const [pagamentos, setPagamentos] = useState([])
    const [idExcluir, setIdExcluir] = useState(0)
  
    const [visible, setVisible] = useState(false);
  
    const hideDialog = () => setVisible(false);

    useFocusEffect(
        React.useCallback(() => {
          carregarDados()
        }, [])
      );

      function carregarDados() {
        AsyncStorage.getItem('pagamentos').then(resultado => {
          resultado = JSON.parse(resultado) || []
          setPagamentos(resultado)
        })
      }

      function confirmarExclusao(id) {
        setIdExcluir(id)
        setVisible(true)
      }
    
      function excluir() {
        pagamentos.splice(idExcluir, 1)
        AsyncStorage.setItem('pagamentos', JSON.stringify(pagamentos))
        carregarDados()
        setVisible(false)
      }

  return (
    <>
      <ScrollView style={{ padding: 15 }}>
        {pagamentos.map((item, indice) => (
          <Card key={indice} mode='outlined' style={{ marginBottom: 10 }}>
            <Card.Content>
            <Text variant="titleLarge">{item.nome}</Text>
            <Text variant="bodyMedium">Remuneração: {item.remuneracao}</Text>
            <Text variant="bodyMedium">Descontos: {item.descontos}</Text>
            <Text variant="bodyMedium">Comissão: {item.comissao}</Text>
            <Text variant="bodyMedium">Passagem: {item.passagem}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton icon='pencil' onPress={() => navigation.push('pagamentos-Formulário', { id: indice, Pagamentos: item })} />
              <IconButton icon='delete' onPress={() => confirmarExclusao(indice)} />
            </Card.Actions>
          </Card>
        ))}

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">Deseja realmente excluir o registro?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={excluir}>Sim</Button>
              <Button onPress={hideDialog}>Não</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      </ScrollView>
      <FAB
                icon="plus"
                size='small'
                style={{ position: 'absolute', right: 10, bottom: 10 }}
                onPress={() => navigation.push('pagamentos-Formulário')}
            />
    </>
  )
}

export default Pagamentos