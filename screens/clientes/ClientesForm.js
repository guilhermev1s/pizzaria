import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { mask } from 'remask'
import cadastroValidator from '../../validators/cadastroValidator'

const ClientesForm = ({ navigation, route }) => {

    let clientes = {
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        cep: '',
        logradouro: '',
        complemento: '',
        numero: '',
        bairro: ''
    }

    const id = route.params?.id
    if (id >= 0) {
        clientes = route.params?.Clientes
    }

    function salvar(dados) {
        AsyncStorage.getItem('clientes').then(resultado => {

            const clientes = JSON.parse(resultado) || []

            if (id >= 0) {
                clientes.splice(id, 1, dados)
            } else {
                clientes.push(dados)
            }

            console.log(clientes)

            AsyncStorage.setItem('clientes', JSON.stringify(clientes))

            navigation.goBack()
        })
    }

    return (
        <>
            <ScrollView style={{ margin: 15 }}>

                <Text>Formulário de Clientes</Text>

                <Formik
                    initialValues={clientes}
                    validationSchema={cadastroValidator}
                    onSubmit={values => salvar(values)}
                >
                    {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
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
                                label='CPF'
                                keyboardType='decimal-pad'
                                value={values.cpf}
                                onChangeText={(value) => { setFieldValue('cpf', mask(value, '999.999.999-99')) }} />
                            {(errors.cpf && touched.cpf) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.cpf}
                                </Text>
                            }

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='E-mail'
                                keyboardType='email-address'
                                value={values.email}
                                onChangeText={handleChange('email')} />
                            {(errors.email && touched.email) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.email}
                                </Text>
                            }

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Telefone'
                                keyboardType='decimal-pad'
                                value={values.telefone}
                                onChangeText={(value) => { setFieldValue('telefone', mask(value, '(99)99999-9999')) }} />
                            {(errors.telefone && touched.telefone) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.telefone}
                                </Text>
                            }

                            <TextInput
                                style={{ marginTop: 10 }}
                                mode='outlined'
                                label='CEP'
                                value={values.cep}
                                onChangeText={(value) => { setFieldValue('cep', mask(value, '99.999-999')) }} />
                            {(errors.cep && touched.cep) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.cep}
                                </Text>
                            }

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Logradouro'
                                value={values.logradouro}
                                onChangeText={handleChange('logradouro')} />
                            {(errors.logradouro && touched.logradouro) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.logradouro}
                                </Text>
                            }

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Complemento'
                                value={values.complemento}
                                onChangeText={handleChange('complemento')} />
                        
                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Número'
                                keyboardType='decimal-pad'
                                value={values.numero}
                                onChangeText={handleChange('numero')} />
                            {(errors.numero && touched.numero) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.numero}
                                </Text>
                            }

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Bairro'
                                value={values.bairro}
                                onChangeText={handleChange('bairro')} />
                            {(errors.bairro && touched.bairro) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.bairro}
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

export default ClientesForm