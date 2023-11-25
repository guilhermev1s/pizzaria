import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import cadastroValidator from '../../validators/cadastroValidator'

const FornecedorForm = ({ navigation, route }) => {
    let fornecedor = {
        razaosocial: '',
        cnpj: '',
        prazo: '',
        endereco: ''
    }

    const id = route.params?.id
    if (id >= 0) {
        fornecedor = route.params?.Fornecedor
    }

    function salvar(dados) {
        AsyncStorage.getItem('fornecedor').then(resultado => {

            const fornecedor = JSON.parse(resultado) || []

            if (id >= 0) {
                fornecedor.splice(id, 1, dados)
            } else {
                fornecedor.push(dados)
            }

            console.log(fornecedor)

            AsyncStorage.setItem('fornecedor', JSON.stringify(fornecedor))

            navigation.goBack()
        })
    }

    return (
        <>
            <ScrollView style={{ margin: 15 }}>

                <Text>Formulário de Fornecedor</Text>

                <Formik
                    initialValues={fornecedor}
                    validationSchema={cadastroValidator}
                    onSubmit={values => salvar(values)}
                >
                    {({ values, handleChange, handleSubmit, errors, touched }) => (
                        <View>
                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Razão social'
                                keyboardType='decimal-pad'
                                value={values.razaosocial}
                                onChangeText={handleChange('razaosocial')} />
                            {(errors.razaosocial && touched.razaosocial) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.razaosocial}
                                </Text>
                            }

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='CNPJ'
                                keyboardType='decimal-pad'
                                value={values.cnpj}
                                onChangeText={(value) => { setFieldValue('cnpj', mask(value, '99.999.999/9999-99')) }} />
                                {(errors.cnpj && touched.cnpj) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.cnpj}
                                </Text>
                            }

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Prazo'
                                keyboardType='decimal-pad'
                                value={values.prazo}
                                onChangeText={handleChange('prazo')} />
                                {(errors.prazo && touched.prazo) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.prazo}
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

export default FornecedorForm