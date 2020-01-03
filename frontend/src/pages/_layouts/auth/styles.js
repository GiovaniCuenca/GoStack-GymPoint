import styled from 'styled-components';
import { colors } from '../../../styles';

export const Wrapper = styled.div`
  height: 100%;
  background-color: ${colors.gympoint};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 350px;
  background-color: ${colors.branco};
  border-radius: 4px;
  padding: 50px 30px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  form {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-top: 30px;

    strong {
      color: ${colors.cinzaActive};
      font-size: 14px;
      font-weight: bold;
    }

    input {
      background: ${colors.branco};
      border: 2px solid ${colors.cinzaBorda};
      border-radius: 4px;
      height: 44px;
      padding: 0px 15px;
      color: #444;
      margin: 0px 0px 15px 0px;

      &::placeholder {
        color: ${colors.cinzaInactive};
      }
    }

    span {
      color: ${colors.vermelho};
      font-size: 12px;
      margin: -10px 0px 15px 0px;
    }
  }
`;
