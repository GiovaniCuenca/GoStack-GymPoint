import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

import { FiCheckSquare, FiSquare } from 'react-icons/fi';

import { MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ButtonGymPoint, PaginationContainer } from '../../../components';
import { colors } from '../../../styles/colors';
import { Container, PageHeader, PageContent } from './styles';

import api from '../../../services/api';
import history from '../../../services/history';

export default function ListEnrollment() {
  const [enrollments, setEnrollments] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [enrollmentValue, setEnrollmentValue] = useState('');

  useEffect(() => {
    async function loadEnrollments() {
      const response = await api.get('/enrollments', {
        params: { page: pages, q: enrollmentValue },
      });

      const data = response.data.map(enrollment => ({
        ...enrollment,
        start_date: format(
          parseISO(enrollment.start_date),
          "dd 'de' MMMM' de' yyyy",
          { locale: pt }
        ),
        end_date: format(
          parseISO(enrollment.end_date),
          "dd 'de' MMMM' de' yyyy",
          { locale: pt }
        ),
      }));

      setEnrollments(data);
      setPages(response.config.params.page);

      if (!response.data.length && !enrollmentValue.length) {
        setPages(1);
      }

      if (enrollmentValue) {
        setPages(1);
      }
    }

    loadEnrollments();
    setLoading(false);
  }, [pages, enrollmentValue]);

  async function handleEditEnrollment(id) {
    history.push(`/enrollments/update/${id}`);
  }

  async function handleEraseEnrollment(id, name, title) {
    if (
      window.confirm(
        `Você deseja realmente excluir o plano ${title} do aluno(a) ${name} do sistema?`
      )
    ) {
      try {
        await api.delete(`/enrollments/${id}`);

        toast.success('Plano excluído com sucesso!');

        history.push('/');
        history.push('/enrollments');
      } catch (err) {
        toast.error('Erro ao tentar excluir o plano');
      }
    }
  }

  function decreasePage() {
    setPages(pages - 1);
  }

  function increasePage() {
    setPages(pages + 1);
  }

  return (
    <Container>
      <PageHeader>
        <h1>Gerenciando matrículas</h1>
        <nav>
          <Link to="/enrollments/create">
            <ButtonGymPoint
              buttonColor={colors.gympoint}
              text="cadastrar"
              buttonType="button"
            />
          </Link>
          <div className="searchStudent">
            <MdSearch size={20} color={colors.cinzaInactive} />
            <input
              type="text"
              placeholder="Buscar aluno"
              onChange={e => setEnrollmentValue(e.target.value)}
              value={enrollmentValue}
            />
          </div>
        </nav>
      </PageHeader>
      {loading ? (
        'Carregando...'
      ) : (
        <PageContent>
          <table>
            <thead>
              <tr>
                <th className="thnome">ALUNO</th>
                <th className="thtitle">PLANO</th>
                <th className="thdatestart">INÍCIO</th>
                <th className="thdateend">TÉRMINO</th>
                <th className="thactiveEnroll">ATIVA</th>
                <th className="thbuttons"> </th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map(enrollment => (
                <tr key={enrollment.id}>
                  <td className="tdnome">{enrollment.student.name}</td>
                  <td className="tdtitle">{enrollment.plan.title}</td>
                  <td className="tddatestart">{enrollment.start_date}</td>
                  <td className="tddateend">{enrollment.end_date}</td>
                  <td className="tdactiveEnroll">
                    {enrollment.active ? (
                      <FiCheckSquare size={20} color="#42CB59" />
                    ) : (
                      <FiSquare size={20} color="#DDDDDD" />
                    )}
                  </td>
                  <td className="tdbuttons">
                    <button
                      type="button"
                      className="editStudent"
                      onClick={() => handleEditEnrollment(enrollment.id)}
                    >
                      editar
                    </button>
                    <button
                      type="button"
                      className="eraseStudent"
                      onClick={() =>
                        handleEraseEnrollment(
                          enrollment.id,
                          enrollment.student.name,
                          enrollment.plan.title
                        )
                      }
                    >
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationContainer
            pages={pages}
            disabledDecrease={pages < 2}
            onClickDecrease={() => decreasePage()}
            onClickIncrease={() => increasePage()}
          />
        </PageContent>
      )}
    </Container>
  );
}
