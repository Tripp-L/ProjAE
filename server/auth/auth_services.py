from models.user import User, bcrypt
from flask_jwt_extended import create_access_token, create_refresh_token

def authenticate_user(username, password):
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        return {
            'access_token': access_token,
            'refresh_token': refresh_token
        }, 200
    else:
        return {'msg': 'Invalid credentials'}, 401
