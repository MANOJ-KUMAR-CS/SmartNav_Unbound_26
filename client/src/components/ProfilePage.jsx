import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, PhoneCall, UserCog, Droplet, Home, Calendar, ArrowLeft, LogOut } from "lucide-react";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUserData(storedUser);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!userData) {
        return <div className="loading-screen"><div className="loading-spinner"></div></div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <button className="back-button" onClick={handleBack}>
                    <ArrowLeft size={20} /> Back
                </button>
                <h2>User Profile</h2>
            </div>

            <div className="glass-panel profile-card">
                <div className="user-icon-container">
                    <div className="user-icon">
                        <User size={48} />
                    </div>
                </div>

                <h3 className="user-name">{userData.name}</h3>
                <p className="user-email">{userData.email}</p>

                <div className="profile-details">
                    <div className="detail-item">
                        <div className="detail-icon"><Phone size={20} /></div>
                        <div className="detail-content">
                            <div className="detail-label">Phone Number</div>
                            <div className="detail-value">{userData.mobile}</div>
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-icon"><PhoneCall size={20} /></div>
                        <div className="detail-content">
                            <div className="detail-label">Emergency Contact</div>
                            <div className="detail-value">{userData.emergencyContact}</div>
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-icon"><UserCog size={20} /></div>
                        <div className="detail-content">
                            <div className="detail-label">Gender</div>
                            <div className="detail-value">{userData.gender}</div>
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-icon"><Droplet size={20} /></div>
                        <div className="detail-content">
                            <div className="detail-label">Blood Group</div>
                            <div className="detail-value">{userData.bloodGroup}</div>
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-icon"><Home size={20} /></div>
                        <div className="detail-content">
                            <div className="detail-label">Address</div>
                            <div className="detail-value">{userData.address}</div>
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-icon"><Calendar size={20} /></div>
                        <div className="detail-content">
                            <div className="detail-label">Date of Birth</div>
                            <div className="detail-value">{userData.dateOfBirth}</div>
                        </div>
                    </div>
                </div>

                <button className="btn-danger logout-btn" onClick={handleLogout}>
                    <LogOut size={20} /> Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
