import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIURL, callApi } from '../lib';

const SignInPage = () => {
    const [userData, setUserData] = useState({
        id: '',
        firstname: '',
        lastname: '',
        mobile: '',
        email: '',
        dept: '',
        address: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const data = JSON.stringify({
            id: userData.id,
            firstname: userData.firstname,
            lastname: userData.lastname,
            mobile: userData.mobile,
            email: userData.email,
            dept: userData.dept,
            address: userData.address,
            password: userData.password
        });

        callApi("POST", APIURL + "users/saveuser", data, (res) => {
            alert(res.msg || "Registration successful! Please login.");
            navigate('/login');
        });
    };

    return (
        <div className="auth-page signup-bg">
            <div className="glass-container signup-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <img
                        src="/logo1.jpg"
                        alt="KL University Logo"
                        className="auth-logo"
                    />
                    <h1>KL University</h1>
                    <h2>Create Account</h2>
                    <p className="auth-subtitle">Join the KL University portal</p>

                    <div className="input-group">
                        <label>ID Number</label>
                        <input
                            type="text"
                            name="id"
                            placeholder="Enter your University ID"
                            required
                            value={userData.id || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                required
                                value={userData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                required
                                value={userData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Mobile Number</label>
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Enter your mobile number"
                            required
                            value={userData.mobile || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Department</label>
                        <input
                            type="text"
                            name="dept"
                            placeholder="e.g. Computer Science"
                            required
                            value={userData.dept || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Enter your address"
                            required
                            value={userData.address || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={userData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={userData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={userData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="auth-btn">Register</button>

                    <p className="auth-switch">
                        Already have an account? <span onClick={() => navigate('/login')}>Login here</span>
                    </p>
                    <button type="button" onClick={() => navigate('/')} className="back-link">Back to Home</button>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;
