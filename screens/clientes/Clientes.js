import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import { Button, Card, Dialog, FAB, IconButton, Portal, Text } from 'react-native-paper'
import { ScrollView } from 'react-native'

const Clientes = ({ navigation }) => {
  const [clientes, setClientes] = useState([])
  const [idExcluir, setIdExcluir] = useState(0)

  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);

  useFocusEffect(
    React.useCallback(() => {
      carregarDados()
    }, [])
  );

  function carregarDados() {
    AsyncStorage.getItem('clientes').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setClientes(resultado)
    })
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    clientes.splice(idExcluir, 1)
    AsyncStorage.setItem('clientes', JSON.stringify(clientes))
    carregarDados()
    setVisible(false)
  }

  return (
    <>
      <ScrollView style={{ padding: 15 }}>
        {clientes.map((item, indice) => (
          <Card key={indice} mode='outlined' style={{ marginBottom: 10 }}>
            <Card.Content>
              <Text variant="titleLarge">{item.nome}</Text>
              <Text variant="bodyMedium">CPF: {item.cpf}</Text>
              <Text variant="bodyMedium">Email: {item.email}</Text>
              <Text variant="bodyMedium">Telefone: {item.telefone}</Text>
              <Text variant="bodyMedium">CEP: {item.cep}</Text>
              <Text variant="bodyMedium">Logradouro: {item.logradouro}</Text>
              <Text variant="bodyMedium">Complemento: {item.complemento}</Text>
              <Text variant="bodyMedium">Número: {item.numero}</Text>
              <Text variant="bodyMedium">Bairro: {item.bairro}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton icon='pencil' onPress={() => navigation.push('clientes-Formulário', { id: indice, Clientes: item })} />
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
        onPress={() => navigation.push('clientes-Formulário')}
      />

    </>
  )
}

export default Clientes