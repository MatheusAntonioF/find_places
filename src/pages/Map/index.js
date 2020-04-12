import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import { PlaceInfo } from './styles';

import { api_maps } from '../../services/api';

import LoadMap from './WhileLoadMap';
import Place from './Place';

function MapWrapper({ google }) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [selectedPlace, setSelectedPlace] = useState({});

  // Pull data on marker in map
  const [activeMarker, setActiveMarker] = useState({});

  // toggle for show and hide details location
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  // places on region location
  const [places, setPlaces] = useState([]);

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

  function onMarkerClick(props, marker, place) {
    setSelectedPlace(place);
    setActiveMarker(marker);
    setShowInfoWindow(true);
  }

  function onClickMap(e) {
    setLatitude(e.latLng.lat());
    setLongitude(e.latLng.lng());
  }

  async function fetchPlaces(mapProps, map) {
    const lat = map.center.lat();
    const lng = map.center.lng();

    const { data } = await api_maps.get(
      'https://cors-anywhere.herokuapp.com/' +
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=supermarket&key=AIzaSyDHmAC9pMhcHcgNqxBkeGh_MkvAMf1ZI7U
        `,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    setPlaces(data.results);
  }
  // console.log(places.length > 1 && places);

  return (
    <>
      {latitude && longitude && (
        <>
          <Map
            google={google}
            zoom={16}
            onReady={(mapProps, map) => fetchPlaces(mapProps, map)}
            initialCenter={{
              lat: latitude,
              lng: longitude,
            }}
            center={{
              lat: latitude,
              lng: longitude,
            }}
            onClick={(t, map, e) => onClickMap(e)}
          >
            <Marker
              onClick={(props, marker, e) => onMarkerClick(props, marker, e)}
              name="Estou aqui!"
              position={{
                lat: latitude,
                lng: longitude,
              }}
            />
            {places.length > 0 &&
              places.map((place) => (
                <Marker
                  key={place.id}
                  onClick={(props, marker) =>
                    onMarkerClick(props, marker, place)
                  }
                  name={place.name}
                  position={place.geometry.location}
                />
              ))}
            <InfoWindow marker={activeMarker} visible={showInfoWindow}>
              <PlaceInfo>
                <h1>{selectedPlace?.name}</h1>
              </PlaceInfo>
            </InfoWindow>
          </Map>
          {showInfoWindow && (
            <Place
              selectedPlace={selectedPlace}
              setShowInfoWindow={setShowInfoWindow}
            />
          )}
        </>
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
