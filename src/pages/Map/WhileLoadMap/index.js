import React from 'react';

import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';

export default function LoadMap() {
  return (
    <Container>
      <FaSpinner size={54} />
    </Container>
  );
}
