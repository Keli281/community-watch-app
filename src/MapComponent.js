import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import IssueForm from './IssueForm';
import './MapComponent.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      console.log('Map clicked!', e.latlng);
      onMapClick(e);
    },
  });
  return null;
}

function MapComponent() {
  const [pins, setPins] = useState([{ lat: -1.2921, lng: 36.8219 }]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);

  const handleMapClick = (e) => {
    console.log('HandleMapClick called!', e.latlng);
    const { lat, lng } = e.latlng;
    const newPin = { lat, lng };
    console.log('Adding new pin:', newPin);
    setPins([...pins, newPin]);
  };

  const handleReportButton = (pin) => {
    setSelectedPin(pin);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedPin(null);
  };

  const handleSaveIssue = (issueData) => {
    console.log('Issue saved:', issueData);
    alert(`Issue "${issueData.title}" reported successfully!`);
    // We'll save to database later
  };

  console.log('Current pins:', pins);

  return (
    <div className="map-container">
      <h2>CommunityWatch Map - Click anywhere to add pins!</h2>
      <MapContainer 
        center={[-1.2921, 36.8219]}
        zoom={13} 
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapClickHandler onMapClick={handleMapClick} />
        
        {/* Display ALL pins */}
        {pins.map((pin, index) => (
          <Marker key={index} position={[pin.lat, pin.lng]}>
            <Popup>
              Pin #{index + 1}
              <br />
              <button onClick={() => handleReportButton(pin)}>
                Report Issue Here
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Issue Form Popup */}
      {showForm && (
        <IssueForm 
          coordinates={selectedPin}
          onClose={handleCloseForm}
          onSave={handleSaveIssue}
        />
      )}
    </div>
  );
}

export default MapComponent;