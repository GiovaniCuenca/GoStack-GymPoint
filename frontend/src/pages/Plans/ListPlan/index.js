import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { ButtonGymPoint } from '../../../components/ButtonGymPoint';
import { colors } from '../../../styles/colors';
import { Container, PageHeader, PageContent } from './styles';

import api from '../../../services/api';
import history from '../../../services/history';

export default function ListPlan() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');

      const data = response.data.map(plan => ({
        ...plan,
      }));

      setPlans(data);
    }

    loadPlans();
  }, []);

  async function handleEditPlan(id) {
    history.push(`/plans/update/${id}`);
  }

  async function handleErasePlan(id, title) {
    if (
      window.confirm(
        `Você deseja realmente excluir a plano ${title} do sistema?`
      )
    ) {
      try {
        await api.delete(`/plans/${id}`);

        toast.success('Plano excluído com sucesso!');

        history.push('/');
      } catch (err) {
        toast.error('Erro ao tentar excluir plano');
      }
    }
  }

  return (
    <Container>
      <PageHeader>
        <h1>Gerenciando planos</h1>
        <nav>
          <Link to="/plans/create">
            <ButtonGymPoint
              buttonColor={colors.gympoint}
              text="cadastrar"
              buttonType="button"
            />
          </Link>
        </nav>
      </PageHeader>
      <PageContent>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td className="td1">{plan.id}</td>
                <td className="td1">{plan.title}</td>
                <td className="td1">{plan.duration}</td>
                <td className="td1">{plan.price}</td>
                <td className="tdbuttons">
                  <button
                    type="button"
                    className="edit"
                    onClick={() => handleEditPlan(plan.id)}
                  >
                    editar
                  </button>
                  <button
                    type="button"
                    className="erase"
                    onClick={() => handleErasePlan(plan.id, plan.title)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageContent>
    </Container>
  );
}
