import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserSearch, MapPin, History, LogOut } from "lucide-react";
import "../styles/PoliceDashboard.css";

const PoliceDashboard = ({ onSelectUser }) => {
    const [query, setQuery] = useState("");
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!query.trim()) return;
        setIsLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/police/search?q=${query}`);
            if (!res.ok) throw new Error("Failed to fetch user");
            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.error(error);
            alert("User not found or server error");
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            {/* Top right logout */}
            <button 
                onClick={handleLogout} 
                className="btn-secondary" 
                style={{ position: 'absolute', top: '2rem', right: '2rem', padding: '0.5rem 1rem' }}
            >
                <LogOut size={16} /> Logout
            </button>

            <h1 className="dashboard-title">Police Command Center</h1>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Name, Email, Mobile, or User ID..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? <div className="loading-spinner-small"></div> : <Search size={20} />}
                </button>
            </div>

            {/* User Info Card */}
            {user && (
                <div className="user-card animate-fade-in">
                    <div className="user-avatar">
                        <UserSearch size={56} />
                    </div>
                    <div className="user-details">
                        <h2>{user.name}</h2>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>Phone:</b> {user.phone}</p>
                        <p><b>Emergency:</b> {user.emergency_number}</p>
                        <p><b>Blood Group:</b> {user.blood_group}</p>
                        <p><b>Gender:</b> {user.gender}</p>
                        <p><b>DOB:</b> {user.dob}</p>
                        <p><b>Address:</b> {user.address}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button
                            className="btn-primary"
                            onClick={() => {
                                onSelectUser(user);
                                navigate("/police/map");
                            }}
                        >
                            <MapPin size={18} /> Locate Live
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={() => {
                                onSelectUser(user);
                                navigate("/police/history");
                            }}
                        >
                            <History size={18} /> Location History
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PoliceDashboard;
