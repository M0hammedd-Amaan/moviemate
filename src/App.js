import React, { useState, useEffect } from 'react';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import './MovieMate.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({ genre: 'All', platform: 'All', status: 'All' });
  const [sortBy, setSortBy] = useState('Title A-Z');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/movies')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setFilteredMovies(data);
      });
  }, []);

  const addMovie = (movie) => {
    const updatedMovies = [...movies, movie];
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies);
  };

  const deleteMovie = (id) => {
    const updatedMovies = movies.filter(movie => movie.id !== id);
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies);
  };

  const applyFilter = () => {
    const filtered = movies.filter(movie => {
      const genreMatch = filters.genre === 'All' || movie.genre === filters.genre;
      const platformMatch = filters.platform === 'All' || movie.platform === filters.platform;
      const statusMatch = filters.status === 'All' || movie.status === filters.status;
      return genreMatch && platformMatch && statusMatch;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'Title A-Z') return a.title.localeCompare(b.title);
      if (sortBy === 'Title Z-A') return b.title.localeCompare(a.title);
      if (sortBy === 'Rating High-Low') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'Rating Low-High') return (a.rating || 0) - (b.rating || 0);
      return 0;
    });

    setFilteredMovies(sorted);
    setFilterApplied(true);
    setShowFilter(true);
  };

  const clearFilter = () => {
    setFilters({ genre: 'All', platform: 'All', status: 'All' });
    setSortBy('Title A-Z');
    setFilteredMovies(movies);
    setFilterApplied(false);
    setShowFilter(false);
  };

  return (
    <div className="container">
      <h1>MovieMate</h1>
      <MovieForm onAdd={addMovie} />

      {!showList && !showFilter && (
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => setShowList(true)} className="button button-primary">Show List</button>
        </div>
      )}

      {showList && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <button onClick={() => setShowFilter(true)} className="button button-secondary">Show Filter</button>
          </div>

          {showFilter && (
            <div className="filter-section">
              <select value={filters.genre} onChange={(e) => setFilters({ ...filters, genre: e.target.value })}>
                <option>All</option>
                <option>Action</option>
                <option>Comedy</option>
                <option>Drama</option>
                <option>Horror</option>
                <option>Sci-Fi</option>
                <option>Romance</option>
              </select>

              <select value={filters.platform} onChange={(e) => setFilters({ ...filters, platform: e.target.value })}>
                <option>All</option>
                {[...new Set(movies.map(m => m.platform))].map(platform => (
                  <option key={platform}>{platform}</option>
                ))}
              </select>

              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                <option>All</option>
                <option>Watching</option>
                <option>Completed</option>
                <option>Wishlist</option>
              </select>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option>Title A-Z</option>
                <option>Title Z-A</option>
                <option>Rating High-Low</option>
                <option>Rating Low-High</option>
              </select>

              <button onClick={applyFilter} className="button button-primary">Apply Filter</button>
              <button onClick={clearFilter} className="button button-secondary">Clear Filter</button>
            </div>
          )}

          {filterApplied && <h2>Filtered Results</h2>}
          <MovieList movies={filteredMovies} onDelete={deleteMovie} />
        </>
      )}
    </div>
  );
}
export default App;