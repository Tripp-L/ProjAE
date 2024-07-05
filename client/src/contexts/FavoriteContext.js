import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoriteContext = createContext();

export const useFavorites = () => {
    return useContext(FavoriteContext);
};

const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState({
        civilizations: [],
        events: [],
        artifacts: []
    });

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const addFavorite = (item, type) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = {
                ...prevFavorites,
                [type]: [...prevFavorites[type], item]
            };
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    const removeFavorite = (id, type) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = {
                ...prevFavorites,
                [type]: prevFavorites[type].filter(item => item.id !== id)
            };
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export default FavoriteProvider;


