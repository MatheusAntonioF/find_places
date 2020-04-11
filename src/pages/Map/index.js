import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import LoadMap from '../WhileLoadMap';

function MapWrapper({ google }) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [selectedPlace, setSelectedPlace] = useState({});

  const [activeMarker, setActiveMarker] = useState({});

  const [showInfoWindow, setShowInfoWindow] = useState(false);

  useEffect(() => {
    async function loadPosition() {
      let currentPosition;

      if (navigator && navigator.geolocation) {
        currentPosition = await navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          }
        );
      } else {
        // eslint-disable-next-line no-alert
        return alert('Serviço não suportado pelo navegador');
      }
      return currentPosition;
    }
    loadPosition();
  }, []);

  function onMarkerClick(props, marker) {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowInfoWindow(true);
  }

  return (
    <>
      {latitude && longitude && (
        <Map
          google={google}
          zoom={14}
          initialCenter={{
            lat: latitude,
            lng: longitude,
          }}
        >
          <Marker
            onClick={(props, marker, e) => onMarkerClick(props, marker, e)}
            name="Current teste"
          />
          <InfoWindow marker={activeMarker} visible={showInfoWindow}>
            <div>
              <h1>{selectedPlace?.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      )}
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDHmAC9pMhcHcgNqxBkeGh_MkvAMf1ZI7U',
  language: 'pt-br',
  LoadingContainer: LoadMap,
})(MapWrapper);

MapWrapper.propTypes = {
  google: PropTypes.shape({}).isRequired,
};
