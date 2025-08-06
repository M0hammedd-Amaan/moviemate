# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Movie

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db.init_app(app)

with app.app_context():
    db.create_all()
    # Force Insert Sample Movie if DB is Empty (For Initial DB Creation)
    if not Movie.query.first():
        sample = Movie(
            title="Sample Movie",
            director="John Doe",
            genre="Action",
            platform="Netflix",
            status="Completed",
            rating=5,
            review="Sample review"
        )
        db.session.add(sample)
        db.session.commit()

@app.route('/movies', methods=['GET', 'POST'])
def movies():
    if request.method == 'POST':
        data = request.json
        new_movie = Movie(
            title=data['title'],
            director=data['director'],
            genre=data['genre'],
            platform=data['platform'],
            status=data['status'],
            rating=data.get('rating', None),
            review=data.get('review', '')
        )
        db.session.add(new_movie)
        db.session.commit()
        return jsonify({'message': 'Movie added!', 'id': new_movie.id}), 201

    movies = Movie.query.all()
    return jsonify([movie.to_dict() for movie in movies])

@app.route('/movies/<int:id>', methods=['DELETE'])
def delete_movie(id):
    movie = Movie.query.get(id)
    db.session.delete(movie)
    db.session.commit()
    return jsonify({'message': 'Movie deleted!'})

if __name__ == '__main__':
    app.run(debug=True)
