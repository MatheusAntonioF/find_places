import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

import { Container, InputContainer } from './styles';

export default function Input({ width, height, label, ...rest }) {
  const [focus, setFocus] = useState(false);

  return (
    <Container width={width}>
      {label && (
        <label className={`${rest.className} ${focus ? 'focus' : ''}`}>
          {label}
        </label>
      )}
      <InputContainer
        height={height}
        className={`${rest.className} ${focus ? 'focus' : ''}`}
      >
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          {...rest}
        />
        {rest.className === 'success' && <AiFillCheckCircle />}
        {rest.className === 'error' && <AiFillCloseCircle />}
      </InputContainer>
    </Container>
  );
}

Input.propTypes = {
  width: PropTypes.string,
  height: PropTypes.number,
  label: PropTypes.string,
};

Input.defaultProps = {
  width: '300px',
  height: 37,
  label: undefined,
};
