from . import db

class Artifact(db.Model):
    __tablename__ = 'artifact'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    civilization_id = db.Column(db.Integer, db.ForeignKey('civilization.id'))




