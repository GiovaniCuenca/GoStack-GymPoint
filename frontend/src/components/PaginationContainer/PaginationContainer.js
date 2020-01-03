import React from 'react';
import PropTypes from 'prop-types';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { colors } from '../../styles';

import {
  Container,
  ButtonDecrease,
  ButtonIncrease,
} from './PaginationContainer.style';

const PaginationContainer = ({
  pages,
  disabledDecrease,
  onClickIncrease,
  onClickDecrease,
}) => {
  return (
    <Container>
      <ButtonDecrease disabled={disabledDecrease} onClick={onClickDecrease}>
        <FiChevronLeft
          size={30}
          color={!disabledDecrease ? colors.gympoint : colors.cinzaBorda}
        />
      </ButtonDecrease>

      <strong>{`página: ${pages}`}</strong>
      <ButtonIncrease onClick={onClickIncrease}>
        <FiChevronRight size={30} color={colors.gympoint} />
      </ButtonIncrease>
    </Container>
  );
};

PaginationContainer.propTypes = {
  pages: PropTypes.number.isRequired,
  disabledDecrease: PropTypes.bool.isRequired,
  onClickIncrease: PropTypes.func.isRequired,
  onClickDecrease: PropTypes.func.isRequired,
};

export { PaginationContainer };
