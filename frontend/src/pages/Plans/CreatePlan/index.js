import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { formatPrice } from '../../../util/format';

import { ButtonGymPoint } from '../../../components/ButtonGymPoint';
import { Container, PageHeader, PageContent } from './styles';
import { colors } from '../../../styles/colors';

import api from '../../../services/api';
import history from '../../../services/history';

const schema = Yup.object().shape({
  title: Yup.string().required('Insira um título'),
  duration: Yup.number()
    .typeError('Insira uma quantidade de meses correta')
    .positive('Pelo menos 1 mês de duração')
    .lessThan(25, 'Máximo 2 anos de duração')
    .required('Duração obrigatória'),
  price: Yup.number()
    .typeError('Insira um valor válido')
    .positive('Insira um valor válido')
    .required('Valor obrigatório'),
});

export default function CreatePlan() {
  const [totalPrice, setTotalPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    setTotalPrice(formatPrice(`${duration * price}`));
  }, [duration, price]);

  async function handleCreatePlan(data) {
    try {
      await api.post(`/plans`, data);

      toast.success('Plano criado com sucesso');

      history.push('/plans');
    } catch (err) {
      toast.error('Erro ao tentar cadastrar novo plano');
    }
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleCreatePlan}>
        <PageHeader>
          <h1>Cadastro de plano</h1>
          <nav>
            <Link to="/plans">
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
          <strong>TÍTULO DO PLANO</strong>
          <Input name="title" placeholder="Insira um título" />
          <nav className="info">
            <div id="duration">
              <strong>DURAÇÃO (em meses)</strong>
              <Input
                name="duration"
                placeholder="Qual a duração?"
                onChange={e => setDuration(e.target.value)}
              />
            </div>
            <div id="price">
              <strong>PREÇO MENSAL</strong>
              <Input
                name="price"
                placeholder="Valor mensal"
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div id="totalprice">
              <strong>PREÇO TOTAL</strong>
              <Input
                name="totalPrice"
                value={totalPrice}
                placeholder=""
                disabled
              />
            </div>
          </nav>
        </PageContent>
      </Form>
    </Container>
  );
}
