import React from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import { colors } from '../../styles';
import { LoadingStyle } from './Loading.style';

const Loading = ({ color, size }) => {
  return (
    <LoadingStyle>
      <FaSpinner size={size} color={color} />
    </LoadingStyle>
  );
};

export { Loading };

Loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

Loading.defaultProps = {
  color: colors.gympoint,
  size: 30,
};
