import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ViewInfoPage from './pages/ViewInfoPage';
import LoginPage from './pages/LoginPage';
import SignInPage from './pages/SignInPage';
import StudentPage from './pages/StudentPage';
import './App.css';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/view-info" element={<ViewInfoPage />} />
            <Route path="/signup" element={<SignInPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/student" element={<StudentPage />} />
        </Routes>
    );
}

export default App;
