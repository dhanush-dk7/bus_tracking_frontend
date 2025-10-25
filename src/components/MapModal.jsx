import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import API from "../api";
import "leaflet/dist/leaflet.css";

export default function MapModal({ bus, onClose }) {
  const [location, setLocation] = useState({
    latitude: bus.latitude,
    longitude: bus.longitude,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await API.get(`/buses/${bus._id}`);
      setLocation({
        latitude: res.data.latitude,
        longitude: res.data.longitude,
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [bus._id]);

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button onClick={onClose} style={closeStyle}>Close</button>
        <h3>Bus #{bus.bus_number} Live Location</h3>

        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={14}
          style={{ height: "400px", width: "100%", marginTop: "10px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
          />
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>Bus #{bus.bus_number}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "80%",
  maxWidth: "600px",
};

const closeStyle = {
  position: "absolute",
  right: "20px",
  top: "80px",
  cursor: "pointer",
  padding: "8px 16px",
};
