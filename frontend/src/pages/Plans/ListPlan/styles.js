import styled from 'styled-components';
import { colors } from '../../../styles/colors';

export const Container = styled.div`
  margin: 0px auto;
  max-width: 900px;
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

  table {
    flex: 1;
    width: 100%;
    border-collapse: collapse;

    thead {
      tr {
        height: 40px;

        th {
          text-align: left;
          color: ${colors.cinzaActive};
          font-size: 16px;
        }
      }
    }

    tbody {
      tr {
        height: 50px;
        width: 100%;
        color: ${colors.cinzaActive};
        border-bottom: 1px solid ${colors.cinzaBorda};
      }

      .td1 {
        color: ${colors.cinzaContent};
        font-size: 14px;
      }

      .tdbuttons {
        align-items: flex-end;
        text-align: right;
      }

      button {
        background: none;
        border: 0;
      }
      .edit {
        color: ${colors.editBlue};
      }

      .erase {
        margin-left: 20px;
        color: ${colors.vermelho};
      }
    }
  }
`;
