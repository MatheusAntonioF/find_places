import React from 'react';
import PropTypes from 'prop-types';

import { MdClose } from 'react-icons/md';

import { Container, DivExit, Icon, Title, Details } from './styles';

export default function InfoPlace({ selectedPlace, setShowInfoWindow }) {
  return (
    <Container>
      <DivExit>
        <MdClose
          size={28}
          color="#e85247"
          onClick={() => setShowInfoWindow(false)}
        />
      </DivExit>
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

InfoPlace.propTypes = {
  selectedPlace: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    opening_hours: PropTypes.shape({}).isRequired,
    vicinity: PropTypes.string.isRequired,
  }).isRequired,
  setShowInfoWindow: PropTypes.func.isRequired,
};
