import React from 'react'
import { ScrollView, View } from 'react-native'
import { Formik } from 'formik'
import { Button, Text, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import cadastroValidator from '../../validators/cadastroValidator'

const PagamentosForm = ({ navigation, route }) => {

    let pagamentos = {
        nome: '',
        remuneracao: '',
        descontos: '',
        comissao: '',
        passagem: ''
    }

    const id = route.params?.id
    if (id >= 0) {
        pagamentos = route.params?.Pagamentos
    }

    function salvar(dados) {
        AsyncStorage.getItem('pagamentos').then(resultado => {

            const pagamentos = JSON.parse(resultado) || []

            if (id >= 0) {
                pagamentos.splice(id, 1, dados)
            } else {
                pagamentos.push(dados)
            }

            console.log(pagamentos)

            AsyncStorage.setItem('pagamentos', JSON.stringify(pagamentos))

            navigation.goBack()
        })
    }

    return (
        <>
            <ScrollView style={{ margin: 15 }}>

                <Text>Formulário de Pagamentos</Text>

                <Formik
                    initialValues={pagamentos}
                    validationSchema={cadastroValidator}
                    onSubmit={values => salvar(values)}
                >
                    {({ values, handleChange, handleSubmit, errors, touched }) => (
                        <View>
                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Nome'
                                value={values.nome}
                                onChangeText={handleChange('nome')} />
                            {(errors.nome && touched.nome) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.nome}
                                </Text>
                            }

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Remuneração'
                                keyboardType='decimal-pad'
                                value={values.remuneracao}
                                onChangeText={handleChange('remuneracao')} />

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Descontos'
                                keyboardType='decimal-pad'
                                value={values.descontos}
                                onChangeText={handleChange('descontos')} />

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Comissão'
                                keyboardType='decimal-pad'
                                value={values.comissao}
                                onChangeText={handleChange('comissao')} />

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Passagem'
                                keyboardType='decimal-pad'
                                value={values.passagem}
                                onChangeText={handleChange('passagem')} />

                            <Button onPress={handleSubmit}>Salvar</Button>
                        </View>
                    )}
                </Formik>
            </ScrollView>

        </>
    )
}

export default PagamentosForm