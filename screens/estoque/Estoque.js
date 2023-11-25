import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react'
import { Button, Card, Dialog, FAB, IconButton, Portal, Text } from 'react-native-paper';
import { ScrollView } from 'react-native';

const Estoque = ({ navigation }) => {
    const [estoque, setEstoque] = useState([])
    const [idExcluir, setIdExcluir] = useState(0)

    const [visible, setVisible] = useState(false);

    const hideDialog = () => setVisible(false);

    useFocusEffect(
        React.useCallback(() => {
            carregarDados()
        }, [])
    );

    function carregarDados() {
        AsyncStorage.getItem('estoque').then(resultado => {
            resultado = JSON.parse(resultado) || []
            setEstoque(resultado)
        })
    }

    function confirmarExclusao(id) {
        setIdExcluir(id)
        setVisible(true)
    }

    function excluir() {
        estoque.splice(idExcluir, 1)
        AsyncStorage.setItem('estoque', JSON.stringify(estoque))
        carregarDados()
        setVisible(false)
    }

    return (
        <>
            <ScrollView style={{ padding: 15 }}>
                {estoque.map((item, indice) => (
                    <Card key={indice} mode='outlined' style={{ marginBottom: 10 }}>
                        <Card.Content>
                            <Text variant="titleLarge">Matéria prima: {item.materiaprima}</Text>
                            <Text variant="bodyMedium">Código de barra: {item.codigodebarra}</Text>
                            <Text variant="bodyMedium">Peso: {item.peso}</Text>
                            <Text variant="bodyMedium">Sabor: {item.sabor}</Text>
                            <Text variant="bodyMedium">Fornecedor: {item.fornecedor}</Text>
                            <Text variant="bodyMedium">Quantidade: {item.quantidade}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <IconButton icon='pencil' onPress={() => navigation.push('estoque-Formulário', { id: indice, Estoque: item })} />
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
                onPress={() => navigation.push('estoque-Formulário')}
            />

        </>
    )
}

export default Estoque