import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./LandingScreen.css";

export default function LandingScreen() {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [showBusList, setShowBusList] = useState(false);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await API.get("/buses");
        setBuses(res.data);
      } catch (err) {
        console.error("Error fetching buses:", err);
      }
    };
    if (showBusList) fetchBuses();
  }, [showBusList]);

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1 className="landing-title">🚌 Bus Tracking App</h1>
        <p className="landing-subtitle">Choose your role to continue</p>

        {!showBusList ? (
          <div className="btn-group">
            <button
              className="landing-btn driver"
              onClick={() => setShowBusList(true)}
            >
              I am a Bus Driver
            </button>
            <button
              className="landing-btn user"
              onClick={() => navigate("/user")}
            >
              I am a User
            </button>
          </div>
        ) : (
          <>
            <h3 style={{ color: "#fff", marginTop: "20px" }}>Select Your Bus</h3>
            <div className="bus-list">
              {buses.length === 0 ? (
                <p style={{ color: "#eee" }}>No buses available.</p>
              ) : (
                buses.map((bus) => (
                  <button
                    key={bus._id}
                    className="bus-select-btn"
                    onClick={() => navigate(`/driver/${bus._id}`)}
                  >
                    #{bus.bus_number} — {bus.start_from} → {bus.destination}
                  </button>
                ))
              )}
            </div>
            <button
              className="back-btn"
              style={{ marginTop: "15px", background: "#fff", color: "#007bff" }}
              onClick={() => setShowBusList(false)}
            >
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
