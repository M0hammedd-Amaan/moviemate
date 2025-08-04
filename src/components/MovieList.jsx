import React from 'react';
import MovieItem from './MovieItem';

function MovieList({ movies, onDelete }) {
    return (
        <div>
            {movies.map(movie => (
                <MovieItem key={movie.id} movie={movie} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default MovieList;