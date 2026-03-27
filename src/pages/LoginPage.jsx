import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIURL, callApi } from '../lib';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (credentials.email === "dhana0238@gmail.com" && credentials.password === "admin123") {
            alert("Admin Login successful! Redirecting to dashboard...");
            localStorage.setItem("userRole", "admin");
            localStorage.setItem("userEmail", credentials.email);
            navigate('/main');
        } else {
            // Verify Student from Database
            callApi("GET", APIURL + "users/getallusers", "", (res) => {
                const student = res.find(user => user.email === credentials.email && user.password === credentials.password);
                
                if (student) {
                    alert("Login successful! Welcome to your profile.");
                    localStorage.setItem("userRole", "student");
                    localStorage.setItem("userEmail", credentials.email);
                    navigate('/student');
                } else {
                    alert("Invalid email or password. Please try again.");
                }
            });
        }
    };

    return (
        <div className="auth-page login-bg">
            <div className="glass-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <img
                        src={`${import.meta.env.BASE_URL}logo1.jpg`}
                        alt="KL University Logo"
                        className="auth-logo"
                    />
                    <h1>KL University</h1>
                    <h2>Login</h2>
                    <p className="auth-subtitle">Sign in to your account to continue</p>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="username@kluniversity.in"
                            required
                            value={credentials.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="auth-btn">Sign In</button>

                    <p className="auth-switch">
                        Don't have an account? <span onClick={() => navigate('/signup')}>Register here</span>
                    </p>
                    <button type="button" onClick={() => navigate('/')} className="back-link">Back to Home</button>
                    <h5>Admin mail: dhana0238@gmail.com</h5>
                    <h5>Admin password: admin123</h5>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
