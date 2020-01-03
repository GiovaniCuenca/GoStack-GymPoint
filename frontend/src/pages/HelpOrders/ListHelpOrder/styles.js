import styled from 'styled-components';
import { colors } from '../../../styles/colors';

export const Container = styled.div`
  margin: 0px auto;
  max-width: 600px;
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

  div.searchStudent {
    display: flex;
    flex-direction: row;
    align-items: center;

    background-color: #fff;
    border: 1px solid ${colors.cinzaBorda};
    border-radius: 4px;
    height: 44px;

    margin-left: 20px;

    input {
      background-color: #fff;
      border: 0px;
      padding: 0px 15px;
      color: ${colors.cinzaContent};

      &::placeholder {
        font-size: 14px;
        color: ${colors.cinzaBorda};
      }
    }

    svg {
      margin-left: 15px;
    }
  }
`;

export const PageContent = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 30px;

  header {
    text-align: left;
    color: ${colors.cinzaActive};
    font-size: 16px;
    font-weight: bold;
    margin: 0px 0px 20px 0px;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0px;

    border-bottom: 1px solid ${colors.cinzaBorda};

    span {
      text-align: left;
      color: ${colors.cinzaContent};
      font-size: 14px;
    }

    button {
      background: none;
      border: 0;
    }
    .edit {
      color: ${colors.editBlue};
    }
  }
`;

export const ModalAnswer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  width: 450px;
  padding: 10px;

  strong {
    color: ${colors.cinzaActive};
    font-size: 14px;
    margin-bottom: 10px;
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  span {
    text-align: justify;
    color: ${colors.cinzaContent};
    font-size: 16px;
  }

  div {
    margin-bottom: 15px;
  }

  form {
    margin-top: 10px;
    display: flex;
    flex-direction: column;

    button {
      border-radius: 4px;
      width: 100%;
      height: 44px;
      background-color: ${colors.gympoint};
      border: 0px;

      font-weight: bold;
      color: ${colors.branco};
      letter-spacing: 1 px;
    }
  }
`;
