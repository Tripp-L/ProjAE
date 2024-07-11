import React, { useState } from 'react';
import './Searchbar.css';

const Searchbar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="searchbar-container">
            <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={query}
                onChange={handleInputChange}
                style={{ width: '300px', height: '40px' }}
            />
        </div>
    );
};

export default Searchbar;
