import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
// import { formatPrice } from '../../../util/format';

import { ButtonGymPoint } from '../../../components/ButtonGymPoint';
import { Container, PageHeader, PageContent } from './styles';
import { colors } from '../../../styles/colors';

import api from '../../../services/api';
import history from '../../../services/history';

const schema = Yup.object().shape({
  title: Yup.string().required('Insira o título corretamente'),
  duration: Yup.number()
    .typeError('Insira uma duração correta')
    .positive('Insira uma duração correta')
    .lessThan(25, 'Planos com no máximo 2 anos de duração')
    .required('Duração obrigatório'),
  price: Yup.number()
    .typeError('Insira valor correto')
    .positive('Insira um valor de mensal correto')
    .required('Valor obrigatório'),
});

export default function UpdatePlan({ match }) {
  const { id } = match.params;

  const [plan, setPlan] = useState(null);
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    async function loadPlan() {
      try {
        const response = await api.get(`plans/${id}`);
        // const priceFormatted = formatPrice(response.data.price);

        setPlan({ ...response.data /* price: priceFormatted */ });
        setTotalPrice(`R$ ${response.data.duration * response.data.price},00`);
      } catch (err) {
        history.push('/plans');
        toast.error('Plano não encontrado!');
      }
    }

    loadPlan();
  }, [id]);

  async function handleSubmit(data) {
    if (window.confirm('Confirma a alteração do plano?')) {
      try {
        await api.put(`plans/${id}`, data);

        toast.success('Plano atualizado com sucesso!');

        history.push('/plans');
      } catch (err) {
        toast.error('Erro na edição');
      }
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={plan} onSubmit={handleSubmit}>
        <PageHeader>
          <h1>Edição de plano</h1>
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
          <Input name="title" placeholder="" />
          <nav className="info">
            <div id="duration">
              <strong>DURAÇÃO (em meses)</strong>
              <Input name="duration" placeholder="" />
            </div>
            <div id="price">
              <strong>PREÇO MENSAL</strong>
              <Input name="price" placeholder="" />
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

UpdatePlan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
