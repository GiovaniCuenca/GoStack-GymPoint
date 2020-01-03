import React from 'react';
import PropTypes from 'prop-types';

import { FaSpinner } from 'react-icons/fa';
import { colors } from '../../styles/colors';

import buttonIcon from '../../assets/images/buttonIcon.png';
import { PageButton } from './styles';

const ButtonGymPoint = ({
  buttonColor,
  text,
  hideIcon,
  buttonType,
  marginLeft,
  marginRight,
  loading,
}) => {
  if (loading) {
    return (
      <PageButton
        marginLeft={marginLeft}
        marginRight={marginRight}
        backgroundColor={buttonColor}
        type={buttonType}
      >
        <img src={buttonIcon} alt="" hidden={hideIcon} />
        <FaSpinner size={25} color={colors.branco} />
      </PageButton>
    );
  }

  return (
    <PageButton
      marginLeft={marginLeft}
      marginRight={marginRight}
      backgroundColor={buttonColor}
      type={buttonType}
    >
      <img src={buttonIcon} alt="" hidden={hideIcon} />
      {text}
    </PageButton>
  );
};

ButtonGymPoint.propTypes = {
  buttonColor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  hideIcon: PropTypes.bool,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  loading: PropTypes.bool,
};

ButtonGymPoint.defaultProps = {
  hideIcon: false,
  marginLeft: 0,
  marginRight: 0,
  loading: false,
};

export { ButtonGymPoint };
