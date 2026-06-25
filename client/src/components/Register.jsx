import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, MapPin, Hash, Shield, Droplets, Lock, ArrowRight } from 'lucide-react';
import '../styles/Auth.css';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        emergency_contact: '',
        gender: '',
        bloodGroup: '',
        dob: '',
        address: '',
        password: '',
        confirmPassword: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (formData.password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        // Validate phone numbers
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.mobile)) {
            alert('Enter a valid 10-digit phone number');
            return;
        }
        if (!phoneRegex.test(formData.emergency_contact)) {
            alert('Enter a valid 10-digit emergency contact number');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registration successful!');
                navigate('/login');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error(error);
            alert('Server error, try again later');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container" style={{ padding: '3rem 1rem' }}>
            {/* Background elements */}
            <div className="bg-shape shape-1"></div>
            <div className="bg-shape shape-2"></div>
            <div className="bg-shape shape-3"></div>

            <div className="glass-panel auth-card animate-fade-in" style={{ maxWidth: '500px' }}>
                <div className="auth-header">
                    <h2>Create Account</h2>
                    <p>Join SmartNav for smart routing and emergency help</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form" style={{ gap: '1rem' }}>
                    <div className="form-group">
                        <div className="input-icon-wrapper">
                            <User className="input-icon" size={18} />
                            <input type="text" name="name" className="input-field" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="input-icon-wrapper">
                            <Mail className="input-icon" size={18} />
                            <input type="email" name="email" className="input-field" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    
                    <div className="form-group flex gap-2" style={{ display: 'flex', gap: '1rem' }}>
                        <div className="input-icon-wrapper w-1/2" style={{ flex: 1 }}>
                            <Phone className="input-icon" size={18} />
                            <input type="tel" name="mobile" className="input-field" placeholder="Phone (10 digits)" value={formData.mobile} onChange={handleChange} required />
                        </div>
                        <div className="input-icon-wrapper w-1/2" style={{ flex: 1 }}>
                            <Shield className="input-icon" size={18} />
                            <input type="tel" name="emergency_contact" className="input-field" placeholder="Emergency Contact" value={formData.emergency_contact} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group flex gap-2" style={{ display: 'flex', gap: '1rem' }}>
                        <div className="input-icon-wrapper w-1/2" style={{ flex: 1 }}>
                            <Calendar className="input-icon" size={18} />
                            <input type="date" name="dob" className="input-field" value={formData.dob} onChange={handleChange} required style={{ colorScheme: 'dark' }} />
                        </div>
                        <div className="input-icon-wrapper w-1/2" style={{ flex: 1 }}>
                            <Droplets className="input-icon" size={18} />
                            <select name="bloodGroup" className="input-field" value={formData.bloodGroup} onChange={handleChange} required style={{ backgroundColor: 'rgba(15, 17, 21, 0.5)' }}>
                                <option value="">Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="input-icon-wrapper">
                            <MapPin className="input-icon" size={18} />
                            <input type="text" name="address" className="input-field" placeholder="Full Address" value={formData.address} onChange={handleChange} required />
                        </div>
                    </div>
                    
                    <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Gender</span>
                        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-primary)' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                                <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} required /> Male
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                                <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} required /> Female
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                                <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} required /> Other
                            </label>
                        </div>
                    </div>

                    <div className="form-group flex gap-2" style={{ display: 'flex', gap: '1rem' }}>
                        <div className="input-icon-wrapper w-1/2" style={{ flex: 1 }}>
                            <Lock className="input-icon" size={18} />
                            <input type="password" name="password" className="input-field" placeholder="Password" value={formData.password} onChange={handleChange} required minLength="6" />
                        </div>
                        <div className="input-icon-wrapper w-1/2" style={{ flex: 1 }}>
                            <Hash className="input-icon" size={18} />
                            <input type="password" name="confirmPassword" className="input-field" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary auth-btn" style={{ marginTop: '1rem' }} disabled={isLoading}>
                        {isLoading ? <div className="loading-spinner-small"></div> : <>Register Securely <ArrowRight size={18} /></>}
                    </button>
                </form>

                <div className="auth-divider">
                    <span>or</span>
                </div>

                <p className="register-prompt">
                    Already have an account?{' '}
                    <span 
                        className="register-link" 
                        onClick={() => navigate('/login')}
                    >
                        Sign in here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
