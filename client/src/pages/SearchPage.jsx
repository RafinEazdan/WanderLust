import React, { useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
    const [query, setQuery] = useState(''); // Store the search term
    const [results, setResults] = useState([]); // Store the search results
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error state

    // Function to handle the search when the button is clicked
    const handleSearch = async () => {
        if (!query) {
            setError('Please enter a search term');
            return;
        }

        setLoading(true);
        setError(''); // Reset error on new search

        try {
            // Make a GET request to the backend API with the search term
            const response = await axios.get(`http://localhost:3000/search?q=${query}`);
            setResults(response.data); // Set results from API response
        } catch (err) {
            setError('Error fetching data, please try again later');
            console.error(err);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="search-container">
            <h1>Search Items</h1>
            <input
                type="text"
                placeholder="Enter search term"
                value={query}
                onChange={(e) => setQuery(e.target.value)} // Update query state
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">Search</button>

            {loading && <p>Loading...</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

            {/* Display search results */}
            {results.length > 0 && (
                <ul>
                    {results.map((place, index) => (
                        <li key={index}>
                            <h3>{place.name}</h3>
                            <p>{place.description}</p>
                        </li>
                    ))}
                </ul>
            )}

            {/* Message if no results found */}
            {results.length === 0 && !loading && !error && <p>No results found</p>}
        </div>
    );
};

export default SearchPage;
