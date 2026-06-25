import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, Shield, UserCircle, CheckCircle } from 'lucide-react';
import SOSButton from './SOSButton';
import { useNavigate } from 'react-router-dom';
import '../styles/EmergencyPage.css';

const EmergencyPage = ({ route }) => {
    const [timer, setTimer] = useState(15 * 60); // 15 minutes in seconds
    const [familyNotified, setFamilyNotified] = useState(false);
    const [pageOpenedAt] = useState(new Date());

    const navigate = useNavigate();

    useEffect(() => {
        if (!familyNotified && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        setFamilyNotified(true);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [familyNotified, timer]);

    const formatClockTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        return `${hours}:${minutes} ${ampm}`;
    };

    const formatCountdown = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleFalseAlarm = () => {
        if (window.confirm('Are you sure this is a false alarm?')) {
            navigate('/map');
        }
    };

    const handleNotifyFamily = async() => {
        try {
            await fetch("https://n8n-1-szop.onrender.com/webhook/alert_sos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: "123", status: "lost" })
            });
        } catch(e) { console.error(e) }
        setFamilyNotified(true);
        setTimer(0);
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <div className={`emergency-page ${familyNotified ? "notified" : "alert-mode"}`}>
            <div className="pulse-overlay"></div>
            
            <button className="profile-button glass-btn" onClick={handleProfileClick}>
                <UserCircle size={28} />
            </button>

            <SOSButton />

            <div className="glass-panel emergency-container">
                <div className="emergency-content">
                    <div className="emergency-header">
                        <div className="emergency-icon-container">
                            <AlertTriangle size={56} className="emergency-icon pulse-anim" />
                        </div>
                        <h1>Connection Lost</h1>
                        <p>We've detected you may need assistance</p>
                    </div>

                    {!familyNotified ? (
                        <div className="timer-card">
                            <h2>Emergency Timer</h2>
                            <div className="current-time">
                                Status tracking since: <span>{formatClockTime(pageOpenedAt)}</span>
                            </div>
                            <div className="timer-display text-glow">{formatCountdown(timer)}</div>
                            <p className="timer-desc">Emergency contacts will be automatically notified when timer reaches 00:00</p>
                        </div>
                    ) : (
                        <div className="notification-status">
                            <div className="status-icon"><CheckCircle size={48} /></div>
                            <h3>Family Notified</h3>
                            <p>Your emergency contacts have been sent your location and status.</p>
                        </div>
                    )}

                    <div className="emergency-actions">
                        <button
                            onClick={handleFalseAlarm}
                            className="btn-secondary false-alarm-button"
                        >
                            <Shield size={22} />
                            <span>False Alarm</span>
                        </button>

                        {!familyNotified ? (
                            <button
                                onClick={handleNotifyFamily}
                                className="btn-danger alert-family-button text-glow-hover"
                            >
                                <Phone size={22} />
                                <span>Notify Family</span>
                            </button>
                        ) : (
                            <button disabled className="btn-secondary disabled">
                                <Phone size={22} />
                                <span>Notified Family</span>
                            </button>
                        )}
                    </div>

                    <div className="emergency-info">
                        <h3>Emergency Details</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">From</span>
                                <span className="info-val truncate">{route?.from?.address || 'Location unavailable'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">To</span>
                                <span className="info-val truncate">{route?.to?.address || 'Destination unavailable'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Last Known</span>
                                <span className="info-val truncate">{route?.from?.address || 'Location unavailable'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Mode</span>
                                <span className="info-val capitalize">{route?.transportMode || 'Unknown'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyPage;
