import React from 'react';
import PropTypes from 'prop-types';

import { Container, Icon, Title, Details } from './styles';

export default function Place({ selectedPlace, setShowInfoWindow }) {
  console.log(selectedPlace);
  // opening_hours
  return (
    <Container>
      <Icon>
        <img src={selectedPlace.icon} alt="Ícone do estabelecimento" />
      </Icon>
      <Title>{selectedPlace.name}</Title>
      <Details status_place={selectedPlace.opening_hours}>
        <div className="status">
          <span>{selectedPlace.opening_hours ? 'Aberto' : 'Fechado'}</span>
        </div>
        <div className="address">
          <span>Endereço:</span>
          <address>{selectedPlace.vicinity}</address>
        </div>
      </Details>
    </Container>
  );
}

Place.propTypes = {
  selectedPlace: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    opening_hours: PropTypes.bool.isRequired,
    vicinity: PropTypes.string.isRequired,
  }).isRequired,
  setShowInfoWindow: PropTypes.func.isRequired,
};
