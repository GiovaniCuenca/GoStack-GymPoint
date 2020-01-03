import styled from 'styled-components';
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

  strong:first-child {
    margin-top: 0px;
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

    div#idade {
      flex: 0.33;
      display: flex;
      flex-direction: column;
    }
    div#peso {
      flex: 0.33;
      display: flex;
      flex-direction: column;
      margin-left: 16px;
    }
    div#altura {
      flex: 0.33;
      display: flex;
      flex-direction: column;
      margin-left: 16px;
    }
  }
`;
