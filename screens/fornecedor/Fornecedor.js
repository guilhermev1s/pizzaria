import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { Button, Card, Dialog, FAB, IconButton, Portal, Text } from 'react-native-paper';

const Fornecedor = ({ navigation }) => {
    const [fornecedor, setFornecedor] = useState([])
    const [idExcluir, setIdExcluir] = useState(0)

    const [visible, setVisible] = useState(false);

    const hideDialog = () => setVisible(false);

    useFocusEffect(
        React.useCallback(() => {
            carregarDados()
        }, [])
    );

    function carregarDados() {
        AsyncStorage.getItem('fornecedor').then(resultado => {
            resultado = JSON.parse(resultado) || []
            setFornecedor(resultado)
        })
    }

    function confirmarExclusao(id) {
        setIdExcluir(id)
        setVisible(true)
    }

    function excluir() {
        fornecedor.splice(idExcluir, 1)
        AsyncStorage.setItem('fornecedor', JSON.stringify(fornecedor))
        carregarDados()
        setVisible(false)
    }

  return (
    <>
    <ScrollView style={{ padding: 15 }}>
        {fornecedor.map((item, indice) => (
            <Card key={indice} mode='outlined' style={{ marginBottom: 10 }}>
                <Card.Content>
                    <Text variant="titleLarge">Razão Social: {item.razaosocial}</Text>
                    <Text variant="bodyMedium">CNPJ: {item.cnpj}</Text>
                    <Text variant="bodyMedium">Prazo: {item.prazo}</Text>
                    <Text variant="bodyMedium">Endereço: {item.endereco}</Text>
                </Card.Content>
                <Card.Actions>
                    <IconButton icon='pencil' onPress={() => navigation.push('fornecedor-Formulário', { id: indice, Fornecedor: item })} />
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
        onPress={() => navigation.push('fornecedor-Formulário')}
    />

</>
  )
}

export default Fornecedor