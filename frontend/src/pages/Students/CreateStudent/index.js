import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { ButtonGymPoint } from '../../../components/ButtonGymPoint';
import { Container, PageHeader, PageContent } from './styles';
import { colors } from '../../../styles/colors';

import api from '../../../services/api';
import history from '../../../services/history';

const schema = Yup.object().shape({
  name: Yup.string().required('Insira o nome completo do aluno(a)'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('E-mail obrigatório'),
  age: Yup.number()
    .typeError('Insira a idade corretamente')
    .positive('Insira a idade corretamente')
    .lessThan(110, 'Insira a idade corretamente')
    .required('Idade obrigatório'),
  weight: Yup.number()
    .typeError('Insira o peso corretamente')
    .positive('Insira o peso corretamente')
    .lessThan(300, 'Insira o peso corretamente')
    .required('Peso obrigatório'),
  height: Yup.number()
    .typeError('Insira a altura corretamente')
    .positive('Insira a altura corretamente')
    .lessThan(300, 'Insira a altura corretamente')
    .required('Peso obrigatório'),
});

export default function CreateStudent() {
  async function handleCreateStudent(data) {
    try {
      await api.post(`/students`, data);

      toast.success('Aluno(a) criado com sucesso');

      history.push('/students');
    } catch (err) {
      toast.error('Erro ao tentar cadastrar novo(a) aluno(a)');
    }
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleCreateStudent}>
        <PageHeader>
          <h1>Cadastro de aluno</h1>
          <nav>
            <Link to="/students">
              <ButtonGymPoint
                buttonColor={colors.cinzaVoltar}
                text="Voltar"
                buttonType="submit"
              />
            </Link>

            <ButtonGymPoint
              buttonColor={colors.gympoint}
              text="Salvar"
              buttonType="submit"
              marginLeft={20}
            />
          </nav>
        </PageHeader>

        <PageContent>
          <strong>NOME COMPLETO</strong>
          <Input name="name" placeholder="" />
          <strong>E-MAIL</strong>
          <Input name="email" placeholder="" />
          <nav className="info">
            <div id="idade">
              <strong>IDADE</strong>
              <Input name="age" placeholder="" />
            </div>
            <div id="peso">
              <strong>PESO (em Kg)</strong>
              <Input name="weight" placeholder="" />
            </div>
            <div id="altura">
              <strong>ALTURA (em Cm)</strong>
              <Input name="height" placeholder="" />
            </div>
          </nav>
        </PageContent>
      </Form>
    </Container>
  );
}
