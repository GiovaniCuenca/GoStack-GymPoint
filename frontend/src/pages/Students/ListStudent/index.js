import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
  ButtonGymPoint,
  Loading,
  PaginationContainer,
} from '../../../components';
import { colors } from '../../../styles';
import { Container, PageHeader, PageContent } from './styles';

import api from '../../../services/api';
import history from '../../../services/history';

export default function ListStudent() {
  const [students, setStudents] = useState([]);
  const [pages, setPages] = useState(1);
  const [studentValue, setStudentValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function loadStudents() {
      const response = await api.get('/students', {
        params: { page: pages, q: studentValue },
      });

      const data = response.data.map(student => ({
        ...student,
      }));

      setStudents(data);
      setPages(response.config.params.page);

      if (!response.data.length && !studentValue.length) {
        setPages(1);
      }

      if (studentValue) {
        setPages(1);
      }
    }

    loadStudents();
    setIsLoading(false);
  }, [studentValue, pages]);

  async function handleEditStudent(id) {
    history.push(`/students/update/${id}`);
  }

  async function handleEraseStudent(id, name) {
    if (
      window.confirm(
        `Você deseja realmente excluir a aluno(a) ${name} do sistema?`
      )
    ) {
      try {
        await api.delete(`/students/${id}`);

        toast.success('Aluno excluído com sucesso!');

        history.push('/');
      } catch (err) {
        toast.error('Erro ao tentar excluir o aluno(a)');
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
        <h1>Gerenciando alunos</h1>
        <nav>
          <Link to="/students/create">
            <ButtonGymPoint
              buttonColor={colors.gympoint}
              text="cadastrar"
              buttonType="button"
            />
          </Link>
          <div className="searchStudent">
            <FiSearch size={20} color={colors.cinzaInactive} />
            <input
              type="text"
              placeholder="Buscar aluno"
              onChange={e => setStudentValue(e.target.value)}
              value={studentValue}
            />
          </div>
        </nav>
      </PageHeader>
      <PageContent>
        {isLoading ? (
          <Loading />
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOME</th>
                <th>E-MAIL</th>
                <th>IDADE</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td className="td1">{student.id}</td>
                  <td className="td1">{student.name}</td>
                  <td className="td1">{student.email}</td>
                  <td className="td1">{student.age}</td>
                  <td className="tdbutton">
                    <button
                      type="button"
                      className="editStudent"
                      onClick={() => handleEditStudent(student.id)}
                    >
                      editar
                    </button>
                    <button
                      type="button"
                      className="eraseStudent"
                      onClick={() =>
                        handleEraseStudent(student.id, student.name)
                      }
                    >
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <PaginationContainer
          pages={pages}
          disabledDecrease={pages < 2}
          onClickDecrease={() => decreasePage()}
          onClickIncrease={() => increasePage()}
        />
      </PageContent>
    </Container>
  );
}
