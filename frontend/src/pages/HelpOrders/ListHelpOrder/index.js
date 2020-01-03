import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Form, Input } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';

import { Container, PageHeader, PageContent, ModalAnswer } from './styles';
import { colors } from '../../../styles';

import api from '../../../services/api';
import history from '../../../services/history';

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
};

export default function ListHelpOrder() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [selectHelpOrder, setSelectHelpOrder] = useState({});

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('/help-orders');

      const data = response.data.map(helpOrder => ({
        ...helpOrder,
      }));

      setHelpOrders(data);
    }

    loadHelpOrders();
  }, []);

  function handleOpenModal(helpOrder) {
    setSelectHelpOrder({
      id: helpOrder.id,
      question: helpOrder.question,
    });

    setModalIsOpen(true);
  }

  async function handleSubmit({ answer }) {
    await api.put(`help-orders/${selectHelpOrder.id}/answer`, {
      answer,
    });
    toast.success('Pedido de auxílio respondido com sucesso!');
    history.push('/');
    history.push('/help-orders');
    setModalIsOpen(false);
  }

  return (
    <Container>
      <PageHeader>
        <h1>Pedidos de auxílio</h1>
      </PageHeader>
      <PageContent>
        <header>ALUNO</header>
        {helpOrders.map(helpOrder => (
          <div key={helpOrder.id}>
            <span>{helpOrder.student.name}</span>
            <button
              type="button"
              className="edit"
              onClick={() => handleOpenModal(helpOrder)}
            >
              responder
            </button>
          </div>
        ))}

        <Modal
          isOpen={modalIsOpen}
          style={customModalStyles}
          contentLabel="Example Modal"
        >
          <ModalAnswer>
            <header>
              <strong>PERGUNTA DO ALUNO</strong>
              <MdClose
                size={20}
                color={colors.cinzaInactive}
                onClick={() => setModalIsOpen(false)}
                style={{ cursor: 'pointer' }}
              />
            </header>
            <div>
              <span>{selectHelpOrder.question}</span>
            </div>
            <strong>SUA RESPOSTA</strong>
            <Form onSubmit={handleSubmit}>
              <Input
                name="answer"
                multiline
                style={{
                  height: 200,
                  borderWidth: 1,
                  borderColor: colors.cinzaBorda,
                  borderRadius: 4,
                  marginBottom: 20,
                  fontSize: 14,
                  color: colors.cinzaContent,
                  fontFamily: 'Roboto',
                  padding: 10,
                }}
              />
              <button type="submit">RESPONDER ALUNO</button>
            </Form>
          </ModalAnswer>
        </Modal>
      </PageContent>
    </Container>
  );
}
