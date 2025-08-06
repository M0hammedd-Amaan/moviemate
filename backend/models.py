from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    director = db.Column(db.String(100))
    genre = db.Column(db.String(50))
    platform = db.Column(db.String(50))
    status = db.Column(db.String(50))
    rating = db.Column(db.Integer)
    review = db.Column(db.Text)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'director': self.director,
            'genre': self.genre,
            'platform': self.platform,
            'status': self.status,
            'rating': self.rating,
            'review': self.review
        }