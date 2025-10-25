import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import MapModal from "./MapModal";
import "./UserScreen.css";

export default function UserScreen() {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await API.get("/buses");
        setBuses(res.data);
      } catch (err) {
        console.error("Error fetching buses:", err);
      }
    };
    fetchBuses();
  }, []);

  return (
    <div className="user-container">
      {/* 🔹 Top Header */}
      <nav className="top-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
        <h1>🚌 Bus Tracker</h1>
      </nav>

      {/* 🔹 Content Card */}
      <div className="user-card">
        <header className="user-header">
          <h2>Live Bus Tracker</h2>
          <p>Select a bus to view its real-time location on the map</p>
        </header>

        <div className="bus-list">
          {buses.length === 0 ? (
            <p className="empty-text">No buses available right now.</p>
          ) : (
            buses.map((bus) => (
              <div
                key={bus._id}
                className="bus-card"
                onClick={() => setSelectedBus(bus)}
              >
                <div className="bus-icon">🚌</div>
                <div className="bus-info">
                  <h3>Bus #{bus.bus_number}</h3>
                  <p>
                    {bus.start_from} ➜ {bus.destination}
                  </p>
                  <small>Time: {bus.time}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedBus && (
        <MapModal bus={selectedBus} onClose={() => setSelectedBus(null)} />
      )}
    </div>
  );
}
