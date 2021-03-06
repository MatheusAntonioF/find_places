/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import { FaSpinner } from 'react-icons/fa';

import { toast } from 'react-toastify';

import { PlaceInfo, WrapperDropdown, Loading } from './styles';

import { api_maps } from '../../services/api';

import defaultPlaces from './defaultPlaces';

import LoadMap from './WhileLoadMap';
import InfoPlace from './InfoPlace';

import Dropdown from '../../components/Input/Dropdown';

function MapWrapper({ google }) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [selectedPlace, setSelectedPlace] = useState({});

  const [type, setType] = useState('supermarket');

  const [isLoad, setIsLoad] = useState(false);

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
        return toast.error('Serviço não suportado pelo navegador');
      }
      return currentPosition;
    }
    loadPosition();
  }, []);

  useEffect(() => {
    setIsLoad(true);
    async function fetchPlacesApi() {
      try {
        const { data } = await api_maps.get(
          'https://cors-anywhere.herokuapp.com/' +
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=${type}&key=AIzaSyDHmAC9pMhcHcgNqxBkeGh_MkvAMf1ZI7U
          `
        );

        setPlaces(data.results);
        setIsLoad(false);
      } catch (err) {
        toast.error('Falha ao carregar estabelecimentos');
        console.error(err);
      }
    }

    fetchPlacesApi();
  }, [type, latitude, longitude]);

  function onMarkerClick(props, marker, place, isMyPosition) {
    setSelectedPlace(place);
    setActiveMarker(marker);

    if (isMyPosition) {
      return setShowInfoWindow(false);
    }
    return setShowInfoWindow(true);
  }

  function onClickMap(e) {
    setLatitude(e.latLng.lat());
    setLongitude(e.latLng.lng());
  }

  async function fetchPlaces(mapProps, map) {
    setIsLoad(true);
    const lat = map.center.lat();
    const lng = map.center.lng();

    try {
      const { data } = await api_maps.get(
        'https://cors-anywhere.herokuapp.com/' +
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=${type}&key=AIzaSyDHmAC9pMhcHcgNqxBkeGh_MkvAMf1ZI7U
          `
      );
      setPlaces(data.results);
    } catch (err) {
      toast.error('Falha ao carregar estabelecimentos');
      console.error(err);
    }

    setIsLoad(false);
  }

  return (
    <>
      {latitude && longitude && (
        <>
          <WrapperDropdown showInfoWindow={showInfoWindow}>
            <Dropdown
              placeholder="Selecione um filto"
              options={defaultPlaces}
              onChange={(selected) => setType(selected.value)}
            />
          </WrapperDropdown>
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
              onClick={(props, marker, place) =>
                onMarkerClick(props, marker, place, true)
              }
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
            <InfoPlace
              selectedPlace={selectedPlace}
              setShowInfoWindow={setShowInfoWindow}
            />
          )}
          {isLoad && (
            <Loading isLoad={isLoad}>
              <FaSpinner size={80} />
            </Loading>
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
