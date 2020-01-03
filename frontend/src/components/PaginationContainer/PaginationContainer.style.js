import styled from 'styled-components';
import { colors } from '../../styles';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 30px;

  strong {
    font-size: 16px;
    color: ${colors.cinzaContent};
  }
`;

export const ButtonIncrease = styled.button`
  border: 0px;
  background-color: transparent;
  margin-left: 20px;
`;

export const ButtonDecrease = styled.button`
  border: 0px;
  background-color: transparent;
  margin-right: 20px;
`;
