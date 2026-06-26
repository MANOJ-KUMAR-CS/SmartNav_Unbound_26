import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Mail, ArrowRight } from "lucide-react";
import "../styles/Auth.css";

const Login = ({ onLogin }) => {
    const [loginData, setLoginData] = useState({
        emailOrPhone: "",
        password: "",
    });
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const email = loginData.emailOrPhone.includes("@")
                ? loginData.emailOrPhone
                : "";

            const response = await fetch("http://localhost:5000/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: loginData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Login failed");
            } else {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                const userData = {
                    userId: data.user.userId,
                    name: data.user.name,
                    email: data.user.email,
                    mobile: data.user.mobile,
                    bloodGroup: data.user.bloodGroup,
                    emergencyContact: data.user.emergencyContact,
                    gender: data.user.gender,
                    address: data.user.address,
                    dateOfBirth: data.user.dateOfBirth,
                    role: data.user.role,
                };
                
                if (onLogin) onLogin(userData);

                if (data.user.role === "police") {
                    navigate("/police");
                } else {
                    navigate("/destination");
                }
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Server error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        alert(`Password reset instructions sent to ${resetEmail}`);
        setShowForgotPassword(false);
        setResetEmail("");
    };

    return (
        <div className="auth-container">
            {/* Background elements for modern look */}
            <div className="bg-shape shape-1"></div>
            <div className="bg-shape shape-2"></div>
            <div className="bg-shape shape-3"></div>

            <div className="glass-panel auth-card animate-fade-in">
                {!showForgotPassword ? (
                    <>
                        <div className="auth-header">
                            <h2>Welcome Back</h2>
                            <p>Sign in to continue to SmartNav</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <div className="input-icon-wrapper">
                                    <User className="input-icon" size={20} />
                                    <input
                                        type="text"
                                        name="emailOrPhone"
                                        className="input-field"
                                        placeholder="Email or Phone Number"
                                        value={loginData.emailOrPhone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-icon-wrapper">
                                    <Lock className="input-icon" size={20} />
                                    <input
                                        type="password"
                                        name="password"
                                        className="input-field"
                                        placeholder="Password"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn-primary auth-btn" disabled={isLoading}>
                                {isLoading ? (
                                    <div className="loading-spinner-small"></div>
                                ) : (
                                    <>
                                        Sign In <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="auth-links">
                            <button
                                type="button"
                                className="text-btn forgot-btn"
                                onClick={() => setShowForgotPassword(true)}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <div className="auth-divider">
                            <span>or</span>
                        </div>

                        <p className="register-prompt">
                            Don&apos;t have an account?{" "}
                            <span 
                                className="register-link"
                                onClick={() => navigate("/register")}
                            >
                                Create one now
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <div className="auth-header">
                            <h2>Reset Password</h2>
                            <p>We'll send you recovery instructions</p>
                        </div>

                        <form onSubmit={handleForgotPassword} className="auth-form">
                            <div className="form-group">
                                <div className="input-icon-wrapper">
                                    <Mail className="input-icon" size={20} />
                                    <input
                                        type="email"
                                        name="resetEmail"
                                        className="input-field"
                                        placeholder="Email Address"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn-primary auth-btn">
                                Send Reset Link <ArrowRight size={18} />
                            </button>
                        </form>

                        <div className="auth-links center">
                            <button
                                type="button"
                                className="text-btn"
                                onClick={() => setShowForgotPassword(false)}
                            >
                                Back to Log In
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
