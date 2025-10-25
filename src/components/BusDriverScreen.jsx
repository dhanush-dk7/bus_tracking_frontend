import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import "./BusDriverScreen.css";

export default function BusDriverScreen() {
  const { id } = useParams(); // bus id from route
  const navigate = useNavigate();

  const [bus, setBus] = useState(null);
  const [tracking, setTracking] = useState(false);

  // Fetch bus details initially
  useEffect(() => {
    const fetchBus = async () => {
      try {
        const res = await API.get(`/buses/${id}`);
        setBus(res.data);
      } catch (err) {
        console.error("Error fetching bus:", err);
      }
    };
    fetchBus();
  }, [id]);

  // Update bus location every 5 seconds
  useEffect(() => {
    let interval;
    if (tracking && bus) {
      interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            try {
              await API.put(`/buses/${bus._id}`, { latitude, longitude });
              console.log("Updated:", latitude, longitude);
            } catch (err) {
              console.error("Update error:", err.message);
            }
          },
          (err) => console.error("GPS error:", err),
          { enableHighAccuracy: true }
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [tracking, bus]);

  if (!bus)
    return (
      <div className="driver-container">
        <div className="driver-card">
          <p>Loading bus details...</p>
        </div>
      </div>
    );

  return (
    <div className="driver-container">
      <div className="driver-card">
        <div className="driver-header">
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back
          </button>
        </div>
          <h2>Bus Driver Panel</h2>

        <h3 style={{ marginBottom: "10px" }}>
          #{bus.bus_number} — {bus.start_from} → {bus.destination}
        </h3>

        {!tracking ? (
          <>
            <p className="driver-text">
              Ready to start tracking your journey?
            </p>
            <button className="start-btn" onClick={() => setTracking(true)}>
              🚍 Start Journey
            </button>
          </>
        ) : (
          <div className="tracking-section">
            <div className="pulse"></div>
            <p className="tracking-text">
              🛰 Tracking Active <br /> Updating location every 5 seconds
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
