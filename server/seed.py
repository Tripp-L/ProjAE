from models import db, User, Profile
from app import app

def seed_data():
    with app.app_context():
        db.drop_all()
        db.create_all()

        user1 = User(username='user1', email='user1@example.com')
        user1.set_password('password1')
        user1.set_pin('1234')

        profile1 = Profile(
            user_id=1,
            profile_name='User One',
            profile_image='https://example.com/image1.jpg',
            interests='History, Archaeology',
            knowledge='Ancient Civilizations',
            saved_civilizations='Egypt, Mesopotamia'
        )

        db.session.add(user1)
        db.session.add(profile1)
        db.session.commit()

if __name__ == "__main__":
    seed_data()
