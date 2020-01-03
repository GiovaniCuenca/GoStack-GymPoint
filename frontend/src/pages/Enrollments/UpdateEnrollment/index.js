import React, { useState, useEffect, useMemo } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format, parseISO, addMonths } from 'date-fns';

import { Form, Input } from '@rocketseat/unform';

import { ButtonGymPoint } from '../../../components/ButtonGymPoint';
import {
  Container,
  PageHeader,
  PageContent,
  CustomDatePicker,
  CustomAsyncSelectPlans,
} from './styles';
import { colors } from '../../../styles/colors';

import api from '../../../services/api';
import history from '../../../services/history';

export default function UpdateEnrollment({ match }) {
  const { id } = match.params;

  const [isActive, setIsActive] = useState(false);
  const [plans, setPlans] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [enrollment, setEnrollment] = useState('');

  useEffect(() => {
    async function loadEnrollment() {
      try {
        const response = await api.get(`enrollments/${id}`);

        const formatedEndDate = format(
          parseISO(response.data.end_date),
          'dd/MM/yyyy'
        );

        setEnrollment({
          ...response.data,
          end_date: formatedEndDate,
        });

        const formatStartDate = parseISO(response.data.start_date);

        setStartDate(formatStartDate);
        setIsActive(response.data.active);
      } catch (err) {
        toast.error('Matrícula não encontrado!');
        // history.push('/enrollments');
      }
    }

    loadEnrollment();
  }, [id]);

  async function loadPlans() {
    const response = await api.get(`plans`);

    return new Promise(resolve => {
      resolve(
        response.data.map(pl => {
          return {
            value: pl.id,
            label: pl.title,
            duration: pl.duration,
            totalPrice: pl.price * pl.duration,
            ...pl,
          };
        })
      );
    });
  }

  useMemo(() => {
    if (plans && startDate) {
      const formatEndDate = format(
        addMonths(startDate, plans.duration),
        'dd/MM/yyyy'
      );
      const totalPriceCalculation = plans.duration * plans.price;

      setEndDate(formatEndDate);
      setTotalPrice(totalPriceCalculation);
    }
    return '';
  }, [plans, startDate]);

  async function handleSubmit() {
    try {
      await api.put(`enrollments/${id}`, {
        student_id: enrollment.student_id,
        plan_id: plans.id,
        start_date: startDate,
      });

      toast.success('Matrícula do aluno(a) editada com sucesso');
      history.push('/enrollments');
    } catch (err) {
      toast.error('Erro ao tentar editar a matrícula');
    }
  }

  return (
    <Container>
      <Form initialData={enrollment} onSubmit={handleSubmit}>
        <PageHeader>
          <h1>Edição de matrícula</h1>
          <nav>
            <Link to="/enrollments">
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
          <div id="alunoHeader">
            <strong>ALUNO</strong>
            <span
              id="situacao"
              style={
                isActive
                  ? { color: colors.conditionGreen }
                  : { color: colors.cinzaBorda }
              }
            >
              {isActive ? 'ativo' : 'inativo'}
            </span>
          </div>
          <Input
            name="student.name"
            disabled
            style={{ backgroundColor: colors.cinzafundo }}
          />

          <nav className="info">
            <div id="plan">
              <strong>PLANO</strong>
              <CustomAsyncSelectPlans
                name="plan_id"
                isSearchable={false}
                isClearable
                defaultOptions
                loadOptions={e => loadPlans(e)}
                value={plans}
                onChange={e => setPlans(e)}
                placeholder="Alterar plano"
              />
            </div>

            <div id="dateInit">
              <strong>DATA DE INÍCIO</strong>
              <CustomDatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                placeholderText="01/01/2020"
              />
            </div>

            <div id="dateEnd">
              <strong>DATA DE TÉRMINO</strong>
              <Input name="end_date" value={endDate} disabled />
            </div>

            <div id="totalPrice">
              <strong>VALOR FINAL</strong>
              <Input
                name="totalPrice"
                value={!totalPrice ? `R$ 0,00` : `R$ ${totalPrice},00`}
                disabled
              />
            </div>
          </nav>
        </PageContent>
      </Form>
    </Container>
  );
}

UpdateEnrollment.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
