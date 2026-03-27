import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("userRole");

    if (userRole !== "admin") {
        return (
            <div className="access-denied">
                <h2>Access Denied</h2>
                <p>This page is only accessible to administrators.</p>
                <button onClick={() => navigate('/login')}>Back to Login</button>
            </div>
        );
    }

    return (
        <div className="main-page">
            <header className="page-header">
                <div className="logo-container">
                    <img
                        src={`${import.meta.env.BASE_URL}logo1.jpg`}
                        alt="KL University Logo"
                        className="university-logo"
                    />
                    <h1 className="university-name">KL UNIVERSITY</h1>
                </div>
                <nav className="header-nav">
                    <button onClick={() => { localStorage.removeItem("userRole"); navigate('/login'); }} className="nav-btn">Logout</button>
                </nav>
            </header>

            <main className="content-area">
                <div className="hero-section">
                    <h2 className="welcome-text">Welcome to Student Management Portal</h2>
                    <p className="subtitle">Access and manage university information efficiently.</p>
                </div>

                <div className="card-container">
                    <div className="info-card">
                        <div className="card-icon">📊</div>
                        <h3>Information Repository</h3>
                        <p>View, edit, and manage comprehensive student and staff records.</p>
                        <button
                            className="view-btn"
                            onClick={() => navigate('/view-info')}
                        >
                            View Information
                        </button>
                    </div>
                </div>
            </main>

            <footer className="page-footer">
                <p>&copy; 2026 KL University - All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default MainPage;
