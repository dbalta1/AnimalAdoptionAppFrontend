import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const shelters = [
  {
    id: 1,
    name: 'Azil Sarajevo',
    position: [43.8563, 18.4131],
    description: 'Sklonište za napuštene pse i mačke u Sarajevu'
  },
  {
    id: 2,
    name: 'Azil Zenica',
    position: [44.2017, 17.9075],
    description: 'Azil za životinje u Zenici'
  },
  {
    id: 3,
    name: 'Azil Tuzla',
    position: [44.5378, 18.6706],
    description: 'Tuzlansko sklonište za napuštene životinje'
  }
];

// Custom ikonica da se marker prikazuje ispravno
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const ShelterMap = () => {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer center={[44.0, 18.3]} zoom={7} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> doprinosioci'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shelters.map(shelter => (
          <Marker key={shelter.id} position={shelter.position} icon={customIcon}>
            <Popup>
              <strong>{shelter.name}</strong><br />
              {shelter.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ShelterMap;
