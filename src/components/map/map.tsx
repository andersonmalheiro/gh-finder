import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet';
import pin from 'assets/pin.svg';
import { MapWrapper } from './map.styles';

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  markerPosition?: [number, number];
}

export const Map = (props: MapProps) => {
  const { center, markerPosition } = props;

  const mapPinIcon = Leaflet.icon({
    iconUrl: pin,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  });

  return (
    <MapWrapper>
      <MapContainer
        center={center}
        zoom={8}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPS_KEY}`}
        />

        {markerPosition && (
          <Marker icon={mapPinIcon} position={markerPosition} />
        )}
      </MapContainer>
    </MapWrapper>
  );
};
