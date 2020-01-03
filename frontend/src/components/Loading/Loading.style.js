import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingStyle = styled.div`
  align-self: center;
  align-items: center;
  text-align: center;

  ${css`
    svg {
      animation: ${rotate} 2s linear infinite;
    }
  `}
`;
