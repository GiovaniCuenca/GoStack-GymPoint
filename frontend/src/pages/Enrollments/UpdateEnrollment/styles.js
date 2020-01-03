import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import AsyncSelect from 'react-select/async';
import { colors } from '../../../styles/colors';

export const Container = styled.div`
  margin: 0px auto;
  max-width: 900px;

  span {
    color: ${colors.vermelho};
    padding: 15px 0px 0px 0px;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 20px 0px;

  h1 {
    color: ${colors.cinzaContent};
    font-weight: bold;
    font-size: 28px;
  }

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const PageContent = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 30px;

  display: flex;
  flex-direction: column;

  div#alunoHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 0px;

    span#situacao {
      padding: 0;
      align-self: flex-start;
      font-size: 16px;
      letter-spacing: 1pc;
      text-transform: uppercase;
    }

    strong:first-child {
      margin-top: 0px;
    }
  }

  strong {
    color: ${colors.cinzaContent};
    font-size: 16px;
    margin: 20px 0px 10px 0px;
  }

  input {
    background-color: #fff;
    border: 1px solid ${colors.cinzaBorda};
    border-radius: 4px;
    padding: 15px;
    color: ${colors.cinzaContent};
    font-size: 16px;

    &::placeholder {
      font-size: 16px;
      color: ${colors.cinzaBorda};
    }
  }

  nav.info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    strong {
      color: ${colors.cinzaContent};
      font-size: 16px;
      margin: 20px 0px 10px 0px;
    }

    div#plan {
      width: 230px;
      display: flex;
      flex-direction: column;
    }

    div#dateInit {
      width: 190px;
      display: flex;
      flex-direction: column;
      margin-left: 16px;
    }

    div#dateEnd {
      width: 190px;
      display: flex;
      flex-direction: column;
      margin-left: 16px;

      input {
        background-color: ${colors.cinzafundo};
      }
    }
    div#totalPrice {
      width: 190px;
      display: flex;
      flex-direction: column;
      margin-left: 16px;

      input {
        background-color: ${colors.cinzafundo};
      }
    }
  }
`;

export const CustomDatePicker = styled(DatePicker)`
  width: 100%;
`;

export const CustomAsyncSelect = styled(AsyncSelect)`
  color: ${colors.cinzaContent};
  background-color: #fff;
  border-radius: 4px;
  font-size: 16px;
`;

export const CustomAsyncSelectPlans = styled(AsyncSelect)`
  color: ${colors.cinzaContent};
  background-color: #fff;
  border-radius: 4px;
  font-size: 16px;
`;
