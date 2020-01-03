import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Container = styled.div`
  background-color: ${colors.branco};
  border: 1px solid ${colors.cinzaBorda};
  padding: 0px 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1400px;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 30px;
      padding-right: 30px;
      border-right: 1px solid ${colors.cinzaBorda};
    }

    .navText {
      margin-right: 20px;
      font-size: 15px;
      font-weight: bold;
      color: ${colors.cinzaInactive};
      transition: color 0.2s;

      &:hover {
        color: ${colors.cinzaActive};
      }
    }

    .navTextSelected {
      color: ${colors.cinzaActive};
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    display: flex;
    flex-direction: column;

    strong {
      color: ${colors.cinzaContent};
    }

    button {
      background: 0;
      border: 0;
      color: ${colors.vermelho};
      font-size: 12px;
    }
  }
`;
