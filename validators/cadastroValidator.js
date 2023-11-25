import * as Yup from 'yup';
const cadastroValidator = Yup.object().shape({
  nome: Yup.string()
    .max(100, 'Máximo de 100 caractere')
    .required('Campo obrigatório'),
  cpf: Yup.string()
    .max(14, 'Máximo de 14 caracteres')
    .required('CPF é obrigatório'),
  codigodebarra: Yup.number()
    .max(15, 'Máximo de 15 caracteres')
    .required('Código de barra é obrigatório'),
  email: Yup.string()
    .max(100, 'Máximo de 100 caracteres'),
  telefone: Yup.string()
    .max(15, 'Máximo de 15 caracteres'),
  cep: Yup.string()
    .max(11, 'Máximo de 11 caracteres'),
  logradouro: Yup.string()
    .min(3, 'Mínimo de 3 caracteres'),
  numero: Yup.number()
    .min(1, 'Mínimo de 1 caractere'),
  bairro: Yup.string()
    .min(2, 'Mínimo de 2 caracteres'),
  funcao: Yup.string()
    .min(2, 'Mínimo de 2 caracteres')
    .required('Função obrigatório'),
  materiaprima: Yup.string()
    .min(5, 'Mínimo de 5 caracteres'),
  fornecedor: Yup.string()
    .required('Fornecedor é obrigatório'),
    quantidade: Yup.number()
    .min(1, 'Mínimo de 1 caracteres'),
    cnpj: Yup.string()
    .required('CNPJ é obrigatório'),
    remuneracao: Yup.number()
    .required('Remuneração é obrigatória'),
    desconto: Yup.number()
    .required('Desconto é obrigatório'),
    comissao: Yup.number()
    .min(3, 'Mínimo de 3 caracteres')
    .required('Comissão é obrigatório'),
    passagem: Yup.number()
    .max(100, 'Máximo de 100 caracteres')
    .required('Passagem é obrigatório'),
    razaosocial: Yup.string()
    .max(100, 'Máximo de 100 caracteres')
    .required('Razão Social é obrigatório'),
    prazo: Yup.number()
    .min(4, 'Mínimo de 4 caracteres')
    .required('Prazo é obrigatório'),

})

export default cadastroValidator