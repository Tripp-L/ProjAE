from . import db

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
            'profileName': self.profile_name,
            'profileImage': self.profile_image,
            'interests': self.interests,
            'knowledge': self.knowledge,
            'savedCivilizations': self.saved_civilizations
        }
