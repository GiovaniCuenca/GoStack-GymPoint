import styled from 'styled-components';
import { colors } from '../../../styles/colors';

export const Container = styled.div`
  margin: 0px auto;
  max-width: 1200px;
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
    width: 100%;
    border-collapse: collapse;

    thead {
      tr {
        height: 40px;
      }

      .thnome {
        flex: 0.25;
        text-align: left;
        color: ${colors.cinzaContent};
        font-size: 14px;
      }

      .thtitle {
        flex: 0.2;
        text-align: left;
        color: ${colors.cinzaContent};
        font-size: 14px;
      }

      .thdatestart {
        flex: 0.2;
        text-align: left;
        color: ${colors.cinzaContent};
        font-size: 14px;
      }

      .thdateend {
        flex: 0.2;
        text-align: left;
        color: ${colors.cinzaContent};
        font-size: 14px;
      }

      .thactiveEnroll {
        flex: 0.05;
        text-align: center;
      }

      .thbuttons {
        flex: 0.1;
        align-items: flex-end;
        text-align: right;
      }
    }

    tbody {
      tr {
        height: 50px;
        width: 100%;
        color: ${colors.cinzaActive};
        border-bottom: 1px solid ${colors.cinzaBorda};
      }

      .tdnome {
        flex: 0.25;
        text-align: left;
        color: ${colors.cinzaContent};
        font-size: 14px;
      }

      .tdtitle {
        flex: 0.2;
        text-align: left;
        color: ${colors.cinzaContent};
        font-size: 14px;
      }

      .tddatestart {
        flex: 0.2;
        text-align: left;
        color: ${colors.cinzaContent};
        font-size: 14px;
      }

      .tddateend {
        flex: 0.2;
        text-align: left;
        color: ${colors.cinzaContent};
        font-size: 14px;
      }

      .tdactiveEnroll {
        flex: 0.05;
        text-align: center;
      }

      .tdbuttons {
        flex: 0.1;
        align-items: flex-end;
        text-align: right;
      }

      .editStudent {
        color: ${colors.editBlue};
        text-align: right;
      }

      .eraseStudent {
        margin-left: 20px;
        color: ${colors.vermelho};
        text-align: right;
      }

      button {
        background: none;
        border: 0;
      }
    }
  }
`;
