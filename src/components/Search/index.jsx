import React from 'react';

const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <input
            type="search"
            className="search"
            placeholder="Search launches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
};

export default Search;