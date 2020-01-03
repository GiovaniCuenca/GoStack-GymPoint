import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format, addMonths } from 'date-fns';

import { Form, Input } from '@rocketseat/unform';

import { ButtonGymPoint } from '../../../components/ButtonGymPoint';
import {
  Container,
  PageHeader,
  PageContent,
  CustomDatePicker,
  CustomAsyncSelect,
  CustomAsyncSelectPlans,
} from './styles';
import { colors } from '../../../styles/colors';

import api from '../../../services/api';
import history from '../../../services/history';

export default function CreateEnrollment() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [plans, setPlans] = useState('');
  const [student, setStudent] = useState('');

  async function loadStudents(q) {
    const response = await api.get(`students`, { params: { q } });
    return new Promise(resolve => {
      resolve(
        response.data.map(st => {
          return {
            value: st.id,
            label: st.name,
            ...st,
          };
        })
      );
    });
  }

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
      await api.post('/enrollments', {
        student_id: student.id,
        plan_id: plans.id,
        start_date: startDate,
      });

      toast.success('Aluno matriculado com sucesso');
      history.push('/enrollments');
    } catch (err) {
      toast.error('Erro ao tentar realizar a matrícula');
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <PageHeader>
          <h1>Cadastro de matrícula</h1>
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
          <strong>ALUNO</strong>
          <CustomAsyncSelect
            cacheOptions
            isClearable
            defaultOptions
            loadOptions={e => loadStudents(e)}
            value={student}
            onChange={e => setStudent(e)}
            placeholder="Selecionar aluno..."
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
                placeholder="Escolha o plano..."
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
              <Input
                name="end_date"
                value={endDate}
                placeholder="01/02/2020"
                disabled
              />
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
