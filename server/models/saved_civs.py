from . import db

class SavedCivilization(db.Model):
    __tablename__ = 'saved_civs'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    civilization_id = db.Column(db.Integer, db.ForeignKey('civilization.id'), primary_key=True)

