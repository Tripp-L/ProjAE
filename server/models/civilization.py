from . import db

class Civilization(db.Model):
    __tablename__ = 'civilization'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    time_period = db.Column(db.String(100), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey('region.id'))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'time_period': self.time_period,
            'location_id': self.location_id
        }
