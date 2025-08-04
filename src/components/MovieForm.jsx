import React, { useState } from 'react';

function MovieForm({ onAdd }) {
    const [formData, setFormData] = useState({
        title: '', director: '', genre: 'Action', platform: '', status: 'Watching', rating: '', review: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                onAdd({ ...formData, id: data.id });
                setFormData({ title: '', director: '', genre: 'Action', platform: '', status: 'Watching', rating: '', review: '' });
            });
    };

    return (
        <div className="form-section">
            <form onSubmit={handleSubmit}>
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
                <input name="director" value={formData.director} onChange={handleChange} placeholder="Director" required />
                <select name="genre" value={formData.genre} onChange={handleChange}>
                    <option>Action</option>
                    <option>Comedy</option>
                    <option>Drama</option>
                    <option>Horror</option>
                    <option>Sci-Fi</option>
                    <option>Romance</option>
                </select>
                <input name="platform" value={formData.platform} onChange={handleChange} placeholder="Platform" required />
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option>Watching</option>
                    <option>Completed</option>
                    <option>Wishlist</option>
                </select>
                <input name="rating" type="number" min="1" max="5" value={formData.rating} onChange={handleChange} placeholder="Rating (1-5)" required />
                <textarea name="review" value={formData.review} onChange={handleChange} placeholder="Write your review here..." />
                <button type="submit" className="button button-primary">Add Movie</button>
            </form>
        </div>
    );
}

export default MovieForm;