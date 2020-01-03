import styled, { keyframes, css } from 'styled-components';
import { lighten } from 'polished';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const PageButton = styled.button.attrs(props => ({
  type: props.buttonType,
}))`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  border: 0px;
  border-radius: 4px;
  text-transform: uppercase;

  background-color: ${props => props.backgroundColor};

  margin-left: ${props => `${props.marginLeft}px`};
  margin-right: ${props => `${props.marginRight}px`};

  padding: 8px 20px;

  width: auto;
  min-height: 44px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  letter-spacing: 1px;

  transition: background-color 0.2s;

  &:hover {
    background-color: ${props =>
      props.backgroundColor && lighten(0.05, props.backgroundColor)};
  }

  > img {
    margin-right: 14px;
  }

  ${css`
    svg {
      animation: ${rotate} 2s linear infinite;
    }
  `}
`;
