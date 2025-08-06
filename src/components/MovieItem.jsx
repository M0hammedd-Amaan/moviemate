// frontend/src/components/MovieItem.jsx
import React from 'react';

function MovieItem({ movie, onDelete }) {
    const handleDelete = () => {
        fetch(`http://localhost:5000/movies/${movie.id}`, { method: 'DELETE' })
            .then(() => onDelete(movie.id));
    };

    return (
        <div className="movie-card">
            <h2>{movie.title} ({movie.status})</h2>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Platform:</strong> {movie.platform}</p>
            <p><strong>Rating:</strong> {movie.rating}/5</p>
            <p><strong>Review:</strong> {movie.review}</p>
            <button onClick={handleDelete} className="button button-secondary">Delete</button>
        </div>
    );
}

export default MovieItem;
