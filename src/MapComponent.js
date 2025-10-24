import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import IssueForm from './IssueForm';
import Sidebar from './Sidebar';
import './MapComponent.css';

// FIX for blue pin not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Database functions
const saveIssueToDB = async (issueData) => {
  try {
    const response = await fetch('http://localhost:5000/api/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(issueData)
    });
    
    if (!response.ok) throw new Error('Failed to save issue');
    
    const savedIssue = await response.json();
    console.log('Issue saved to database:', savedIssue);
    return savedIssue;
  } catch (error) {
    console.error('Error saving issue:', error);
    alert('Failed to save issue to database. Please check if backend is running.');
    return null;
  }
};

const loadIssuesFromDB = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/issues');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const issues = await response.json();
    console.log('Loaded issues from DB:', issues);
    
    // Ensure we always return an array
    return Array.isArray(issues) ? issues : [];
  } catch (error) {
    console.error('Error loading issues:', error);
    return []; // Always return empty array on error
  }
};

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
  const [savedIssues, setSavedIssues] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);

  // Ensure savedIssues is always an array (SAFETY CHECK)
  const safeSavedIssues = Array.isArray(savedIssues) ? savedIssues : [];

  // Load issues when component mounts
  useEffect(() => {
    const loadIssues = async () => {
      const issues = await loadIssuesFromDB();
      setSavedIssues(issues);
    };
    loadIssues();
  }, []);

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

  const handleSaveIssue = async (issueData) => {
    try {
      console.log('Saving issue to database:', issueData);
      const savedIssue = await saveIssueToDB(issueData);
      
      if (savedIssue) {
        alert(`Issue "${issueData.title}" saved successfully!`);
        // Reload issues to include the new one
        const issues = await loadIssuesFromDB();
        setSavedIssues(issues);
      } else {
        alert('Failed to save issue. Please try again.');
      }
    } catch (error) {
      console.error('Error in handleSaveIssue:', error);
      alert('Failed to save issue. Please try again.');
    }
  };

  return (
    <div className="map-layout">
      {/* Sidebar - pass safeSavedIssues */}
      <Sidebar issues={safeSavedIssues} />
      
      {/* Map Section */}
      <div className="map-section">
        <div className="map-container">
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
            
            {/* Display TEMPORARY pins (click-to-add) */}
            {pins.map((pin, index) => (
              <Marker key={`temp-${index}`} position={[pin.lat, pin.lng]}>
                <Popup>
                  Click "Report Issue Here" to save this location
                  <br />
                  <button onClick={() => handleReportButton(pin)}>
                    Report Issue Here
                  </button>
                </Popup>
              </Marker>
            ))}
            
            {/* Display SAVED issues from database - using safeSavedIssues */}
            {safeSavedIssues.map((issue) => (
              <Marker key={issue._id || Math.random()} position={[issue.coordinates.lat, issue.coordinates.lng]}>
                <Popup>
                  <strong>{issue.title}</strong>
                  <br />
                  {issue.description}
                  <br />
                  <em>Status: {issue.status}</em>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Issue Form Popup */}
        {showForm && (
          <IssueForm 
            coordinates={selectedPin}
            onClose={handleCloseForm}
            onSave={handleSaveIssue}
          />
        )}
      </div>
    </div>
  );
}

export default MapComponent;