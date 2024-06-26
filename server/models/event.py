from . import db
from datetime import datetime

class Event(db.Model):
    __tablename__ = 'event'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    description = db.Column(db.Text, nullable=False)
    civilization_id = db.Column(db.Integer, db.ForeignKey('civilization.id'))

