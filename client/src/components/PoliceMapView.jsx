import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "../styles/PoliceDashboard.css";

// Component to invalidate map size and center
function MapEffect({ location }) {
    const map = useMap();
    const isInitialized = useRef(false);

    useEffect(() => {
        if (location && location.lat && location.lng && !isInitialized.current) {
            if (
                typeof location.lat === "number" &&
                typeof location.lng === "number" &&
                location.lat >= -90 &&
                location.lat <= 90 &&
                location.lng >= -180 &&
                location.lng <= 180
            ) {
                map.setView([location.lat, location.lng], 13);
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
                isInitialized.current = true;
            }
        }
    }, [map, location]);

    return null;
}

const PoliceMapView = ({ selectedUser }) => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const mapRef = useRef(null); 

    useEffect(() => {
        if (!selectedUser || !selectedUser.userId) {
            setError("No user selected or invalid user ID");
            return;
        }

        const fetchLocation = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/location/get/${selectedUser.userId}`
                );
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                if (data && data.length > 0) {
                    const latest = data[0];
                    if (!latest.lat || !latest.lng || isNaN(latest.lat) || isNaN(latest.lng)) {
                        throw new Error("Invalid coordinates received");
                    }

                    // Reverse geocoding using Nominatim
                    const geoRes = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latest.lat}&lon=${latest.lng}`
                    );
                    const geoData = await geoRes.json();

                    setLocation({
                        ...latest,
                        address: geoData.display_name || "Address not found",
                    });
                    setError(null);
                } else {
                    // Fallback to default coordinates
                    setLocation({
                        lat: 11.5333,
                        lng: 77.2333,
                        address: "Sathyamangalam, Erode, Tamil Nadu, India",
                    });
                }
            } catch (err) {
                console.error("Error fetching location:", err);
                setError("Failed to load location data. Using fallback coordinates.");
                setLocation({
                    lat: 11.5333,
                    lng: 77.2333,
                    address: "Sathyamangalam, Erode, Tamil Nadu, India",
                });
            }
        };

        fetchLocation();
    }, [selectedUser]);

    return (
        <div className="map-page" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-dark)' }}>
            <div className="glass-panel" style={{ padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', margin: 0 }}>
                    <MapPin size={24} color="var(--primary-color)" /> 
                    {selectedUser?.name || "User"} - <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500' }}>{location?.address || "Loading..."}</span>
                </h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => navigate(-1)} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                        <ArrowLeft size={18} /> Back
                    </button>
                    <button onClick={() => navigate("/profile")} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
                        <User size={18} /> Profile
                    </button>
                </div>
            </div>

            <div className="glass-panel" style={{ flex: 1, padding: 0, overflow: 'hidden', position: 'relative' }} ref={mapRef}>
                {error ? (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger-color)', padding: '2rem', textAlign: 'center' }}>
                        <p>{error}</p>
                    </div>
                ) : location && location.lat && location.lng ? (
                    <MapContainer
                        center={[location.lat, location.lng]}
                        zoom={13}
                        style={{ height: "100%", width: "100%", filter: 'sepia(10%) contrast(110%) brightness(95%)' }}
                        className="leaflet-container"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                        <Marker position={[location.lat, location.lng]}>
                            <Popup>
                                <strong>{selectedUser?.name || "User"}</strong><br/>
                                {location?.address}
                            </Popup>
                        </Marker>
                        <MapEffect location={location} />
                    </MapContainer>
                ) : (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="loading-spinner-small" style={{ borderColor: 'var(--text-muted)', borderTopColor: 'var(--primary-color)', width: '40px', height: '40px' }}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PoliceMapView;