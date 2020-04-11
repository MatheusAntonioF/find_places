import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'google-maps-react';

export default function CurrentPosition({ map, google, initialCenter }) {
  const [latitude, setLatitude] = useState(initialCenter.lat);
  const [longitude, setLongitude] = useState(initialCenter.lng);

  useEffect(() => {
    async function loadNewLocation() {
      const { maps } = google;

      if (map) {
        const newPosition = new maps.LatLng(latitude, longitude);
        maps.panTo(newPosition);
      }
    }

    loadNewLocation();
  }, [google, initialCenter, latitude, longitude, map]);

  return <div />;
}

CurrentPosition.propTypes = {
  map: PropTypes.shape({}).isRequired,

  google: PropTypes.shape({
    maps: PropTypes.shape({
      LatLng: PropTypes.func.isRequired,
      panTo: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,

  initialCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,

  zoom: PropTypes.number,
  centerAroundCurrentLocation: PropTypes.bool,
  visible: PropTypes.bool,
};

CurrentPosition.defaultProps = {
  zoom: 14,

  centerAroundCurrentLocation: false,
  visible: true,
};
