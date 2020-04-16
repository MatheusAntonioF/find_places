import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select/async';

import { Container } from './styles';

export default function Dropdown({ options, height, width, label, ...rest }) {
  return (
    <Container width={width}>
      {label && <label className={`${rest.className}`}>{label}</label>}
      <Select
        loadOptions={options}
        height={height}
        className="custom__container"
        classNamePrefix="custom"
        {...rest}
      />
    </Container>
  );
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.string,
  height: PropTypes.number,
  label: PropTypes.string,
};

Dropdown.defaultProps = {
  width: '300px',
  height: 35,
  label: undefined,
};
