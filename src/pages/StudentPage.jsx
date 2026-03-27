import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIURL, callApi } from '../lib';

const StudentPage = () => {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        if (!userEmail) {
            navigate('/login');
            return;
        }
        callApi("GET", APIURL + "users/getallusers", "", (res) => {
            const student = res.find(user => user.email === userEmail);
            if (student) {
                setStudentData(student);
            }
            setLoading(false);
        });
    }, [userEmail, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");
        navigate('/login');
    };

    if (loading) {
        return <div className="loading-screen">Loading student information...</div>;
    }

    if (!studentData) {
        return (
            <div className="error-screen">
                <h2>Profile Not Found</h2>
                <p>We couldn't retrieve your information. Please try logging in again.</p>
                <button onClick={handleLogout}>Back to Login</button>
            </div>
        );
    }

    return (
        <div className="student-page">
            <header className="student-header">
                <div className="logo-section">
                    <img src="/logo1.jpg" alt="KL University Logo" className="auth-logo" />
                    <h1>KL University</h1>
                </div>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </header>

            <main className="student-content">
                <div className="profile-card glass-container">
                    <div className="profile-header">
                        <div className="profile-title">
                            <h2>{studentData.firstname} {studentData.lastname}</h2>
                            <p className="id-badge">ID: {studentData.id}</p>
                        </div>
                    </div>

                    <div className="profile-details">
                        <div className="info-group">
                            <label>Department</label>
                            <p>{studentData.dept || "Not specified"}</p>
                        </div>
                        <div className="info-group">
                            <label>Email Address</label>
                            <p>{studentData.email}</p>
                        </div>
                        <div className="info-group">
                            <label>Mobile Number</label>
                            <p>{studentData.mobile}</p>
                        </div>
                        <div className="info-group">
                            <label>Address</label>
                            <p>{studentData.address || "Not specified"}</p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="page-footer">
                <p>&copy; 2026 KL University - Student Portal</p>
            </footer>
        </div>
    );
};

export default StudentPage;
