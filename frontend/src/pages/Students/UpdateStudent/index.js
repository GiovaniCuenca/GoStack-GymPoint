import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
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

export default function UpdateStudent({ match }) {
  const { id } = match.params;

  const [student, setStudent] = useState(null);

  useEffect(() => {
    async function loadStudent() {
      try {
        const response = await api.get(`students/${id}`);

        setStudent({ ...response.data });
      } catch (err) {
        history.push('/students');
        toast.error('Aluno não encontrado!');
      }
    }

    loadStudent();
  }, [id]);

  async function handleSubmit(data) {
    try {
      await api.put(`students/${id}`, data);

      toast.success('Aluno atualizado com sucesso!');
    } catch (err) {
      toast.error('Erro na edição');
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={student} onSubmit={handleSubmit}>
        <PageHeader>
          <h1>Edição de aluno</h1>
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
              <strong>ALTURA</strong>
              <Input name="height" placeholder="" />
            </div>
          </nav>
        </PageContent>
      </Form>
    </Container>
  );
}

UpdateStudent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
