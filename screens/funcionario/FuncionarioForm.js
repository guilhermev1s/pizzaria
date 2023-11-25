import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { mask } from 'remask'
import cadastroValidator from '../../validators/cadastroValidator'

const FuncionarioForm = ({ navigation, route }) => {
    let funcionario = {
        nome: '',
        funcao: '',
        cpf: '',
        telefone: '',
        endereco: ''
    }

    const id = route.params?.id
    if (id >= 0) {
        funcionario = route.params?.Funcionario
    }

    function salvar(dados) {
        AsyncStorage.getItem('funcionario').then(resultado => {

            const funcionario = JSON.parse(resultado) || []

            if (id >= 0) {
                funcionario.splice(id, 1, dados)
            } else {
                funcionario.push(dados)
            }

            console.log(funcionario)

            AsyncStorage.setItem('funcionario', JSON.stringify(funcionario))

            navigation.goBack()
        })
    }

    return (
        <>
            <ScrollView style={{ margin: 15 }}>

                <Text>Formulário de Funcionário</Text>

                <Formik
                    initialValues={funcionario}
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
                                label='Função'
                                value={values.funcao}
                                onChangeText={handleChange('funcao')} />
                                {(errors.funcao && touched.funcao) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.funcao}
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
                                label='Telefone'
                                keyboardType='decimal-pad'
                                value={values.telefone}
                                onChangeText={(value) => { setFieldValue('telefone', mask(value, '(99)99999-9999')) }} />
                                {(errors.telefone && touched.telefone) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.telefone}
                                </Text>
                            }

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Endereço'
                                keyboardType='decimal-pad'
                                value={values.endereco}
                                onChangeText={handleChange('endereco')} />

                            <Button onPress={handleSubmit}>Salvar</Button>
                        </View>
                    )}
                </Formik>

            </ScrollView>
        </>
    )
}

export default FuncionarioForm