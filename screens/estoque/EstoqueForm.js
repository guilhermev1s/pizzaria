import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import cadastroValidator from '../../validators/cadastroValidator'

const EstoqueForm = ({ navigation, route }) => {

    let estoque = {
        materiaprima: '',
        codigodebarra: '',
        peso: '',
        sabor: '',
        fornecedor: '',
        quantidade: ''
    }

    const id = route.params?.id
    if (id >= 0) {
        estoque = route.params?.Estoque
    }

    function salvar(dados) {
        AsyncStorage.getItem('estoque').then(resultado => {

            const estoque = JSON.parse(resultado) || []

            if (id >= 0) {
                estoque.splice(id, 1, dados)
            } else {
                estoque.push(dados)
            }

            console.log(estoque)

            AsyncStorage.setItem('estoque', JSON.stringify(estoque))

            navigation.goBack()
        })
    }

    return (
        <>
            <ScrollView style={{ margin: 15 }}>

                <Text>Formulário de Estoque</Text>

                <Formik
                    initialValues={estoque}
                    validationSchema={cadastroValidator}
                    onSubmit={values => salvar(values)}
                >
                    {({ values, handleChange, handleSubmit, errors, touched }) => (
                        <View>
                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Matéria prima'
                                value={values.materiaprima}
                                onChangeText={handleChange('materiaprima')} />
                            {(errors.materiaprima && touched.materiaprima) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.materiaprima}
                                </Text>
                            }

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Código de barra'
                                keyboardType='decimal-pad'
                                value={values.codigodebarra}
                                onChangeText={handleChange('codigodebarra')} />
                                {(errors.codigodebarra && touched.codigodebarra) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.codigodebarra}
                                </Text>
                            }

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='peso'
                                keyboardType='decimal-pad'
                                value={values.peso}
                                onChangeText={handleChange('peso')} />

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='sabor'
                                keyboardType='decimal-pad'
                                value={values.sabor}
                                onChangeText={handleChange('sabor')} />

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='fornecedor'
                                keyboardType='decimal-pad'
                                value={values.fornecedor}
                                onChangeText={handleChange('fornecedor')} />
                                {(errors.fornecedor && touched.fornecedor) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.fornecedor}
                                </Text>
                            }

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='quantidade'
                                keyboardType='decimal-pad'
                                value={values.quantidade}
                                onChangeText={handleChange('quantidade')} />
                                {(errors.quantidade && touched.quantidade) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.quantidade}
                                </Text>
                            }

                            <Button onPress={handleSubmit}>Salvar</Button>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </>
    )
}

export default EstoqueForm