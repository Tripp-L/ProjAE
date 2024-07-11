import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import PinConfirm from './components/PinConfirm';
import Civilizations from './components/Civilizations';
import Events from './components/Events';
import Regions from './components/Regions';
import Artifacts from './components/Artifacts';
import BookRecommendation from './components/BookRecommendation';
import axios from 'axios';
import FavoriteProvider from './contexts/FavoriteContext';

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [bookRecommendations, setBookRecommendations] = useState([]);
    const [showBookRecommendations, setShowBookRecommendations] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
                try {
                    const response = await axios.get('/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    setLoggedIn(true);
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        try {
                            const refreshResponse = await axios.post('/auth/refresh', null, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
                                }
                            });
                            const { access_token } = refreshResponse.data;
                            localStorage.setItem('access_token', access_token);
                            setLoggedIn(true);
                        } catch (refreshError) {
                            setLoggedIn(false);
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                            navigate('/login');
                        }
                    } else if (error.response && error.response.status === 404) {
                        setLoggedIn(true);
                    }
                }
            } else {
                setLoggedIn(false);
            }
            setLoading(false);
        };
        checkLoginStatus();
    }, [navigate]);

    const handleLoginSuccess = () => {
        setLoggedIn(true);
        navigate('/');
    };

    const handleLogout = () => {
        setLoggedIn(false);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    const handlePinConfirmSuccess = () => {
        navigate('/profile');
    };

    const handleProfileCompletion = () => {
        navigate('/');
    };

    const handleExpandBooks = (books) => {
        setBookRecommendations(books);
    };

    const hideBookRecommendations = () => {
        setShowBookRecommendations(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const renderBookRecommendations = location.pathname.includes('/civilizations') || location.pathname.includes('/artifacts') || location.pathname.includes('/events');

    return (
        <FavoriteProvider>
            <div>
                {location.pathname !== '/signup' && location.pathname !== '/login' && location.pathname !== '/pin-confirm' && (
                    <>
                        <Header loggedIn={loggedIn} profile={null} onLogout={handleLogout} />
                        <Navbar />
                    </>
                )}
                
                <Routes>
                    <Route path="/" element={loggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/pin-confirm" element={<PinConfirm onPinConfirmSuccess={handlePinConfirmSuccess} />} />
                    <Route path="/profile" element={<Profile onProfileCompletion={handleProfileCompletion} />} />
                    <Route path="/civilizations" element={loggedIn ? <Civilizations onExpand={handleExpandBooks} /> : <Navigate to="/login" />} />
                    <Route path="/events" element={loggedIn ? <Events onExpand={handleExpandBooks} /> : <Navigate to="/login" />} />
                    <Route path="/regions/:id" element={loggedIn ? <Regions /> : <Navigate to="/login" />} />
                    <Route path="/regions" element={loggedIn ? <Regions /> : <Navigate to="/login" />} />
                    <Route path="/artifacts" element={loggedIn ? <Artifacts onExpand={handleExpandBooks} /> : <Navigate to="/login" />} />
                </Routes>

                {renderBookRecommendations && showBookRecommendations && (
                    <BookRecommendation books={bookRecommendations} onClose={hideBookRecommendations} />
                )}
            </div>
        </FavoriteProvider>
    );
}

export default App;
