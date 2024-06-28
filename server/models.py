from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    pin_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def set_pin(self, pin):
        self.pin_hash = bcrypt.generate_password_hash(pin).decode('utf-8')

    def check_pin(self, pin):
        return bcrypt.check_password_hash(self.pin_hash, pin)

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    profile_name = db.Column(db.String(120), nullable=True)
    profile_image = db.Column(db.String(255))
    interests = db.Column(db.String(255))
    knowledge = db.Column(db.String(255))
    saved_civilizations = db.Column(db.String(255))

    def to_dict(self):
        return {
            'profile_name': self.profile_name,
            'profile_image': self.profile_image,
            'interests': self.interests,
            'knowledge': self.knowledge,
            'saved_civilizations': self.saved_civilizations
        }
