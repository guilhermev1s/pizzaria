import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react'
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Card, Dialog, FAB, IconButton, Portal, Text } from 'react-native-paper';

const Funcionario = ({ navigation }) => {
  const [funcionario, setFuncionario] = useState([])
  const [idExcluir, setIdExcluir] = useState(0)

  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);

  useFocusEffect(
    React.useCallback(() => {
      carregarDados()
    }, [])
  );

  function carregarDados() {
    AsyncStorage.getItem('funcionario').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setFuncionario(resultado)
    })
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    funcionario.splice(idExcluir, 1)
    AsyncStorage.setItem('funcionario', JSON.stringify(funcionario))
    carregarDados()
    setVisible(false)
  }

  return (
    <>
      <ScrollView style={{ padding: 15 }}>
        {funcionario.map((item, indice) => (
          <Card key={indice} mode='outlined' style={{ marginBottom: 10 }}>
            <Card.Content>
              <Text variant="titleLarge">Nome: {item.nome}</Text>
              <Text variant="bodyMedium">Função: {item.funcao}</Text>
              <Text variant="bodyMedium">CPF: {item.cpf}</Text>
              <Text variant="bodyMedium">Telefone: {item.telefone}</Text>
              <Text variant="bodyMedium">Endereço: {item.endereco}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton icon='pencil' onPress={() => navigation.push('funcionario-Formulário', { id: indice, Funcionario: item })} />
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
        onPress={() => navigation.push('funcionario-Formulário')}
      />

    </>
  )
}

export default Funcionario