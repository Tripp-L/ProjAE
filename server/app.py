from flask import Flask, send_from_directory, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token, create_refresh_token

from models import db, User, Profile

import os

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
app.config.from_object('config')

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
CORS(app, resources={r"/api/*": {"origins": "*"}})
jwt = JWTManager(app)


# Routes to serve React app
@app.route('/')
@app.route('/<path:path>')
def serve_react_app(path=""):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Example route for profile management
@app.route('/auth/profile', methods=['GET', 'POST', 'PATCH', 'DELETE'])
@jwt_required()
def profile():
    try:
        user_id = get_jwt_identity()
        if request.method == 'GET':
            profile = Profile.query.filter_by(user_id=user_id).first()
            if not profile:
                return jsonify({
                    "profileName": "",
                    "profileImage": "Image Url here!",
                    "interests": "Ancient civilizations, history",
                    "knowledge": "Archaeology, cultural anthropology",
                    "savedCivilizations": "Egyptian, Greek, Roman"
                }), 200

            return jsonify({
                "profileName": profile.profile_name,
                "profileImage": profile.profile_image,
                "interests": profile.interests,
                "knowledge": profile.knowledge,
                "savedCivilizations": profile.saved_civilizations
            }), 200

        elif request.method == 'POST' or request.method == 'PATCH':
            profile_data = request.json
            profile = Profile.query.filter_by(user_id=user_id).first()
            if not profile:
                profile = Profile(user_id=user_id)
                db.session.add(profile)

            profile.profile_name = profile_data.get('profileName', profile.profile_name)
            profile.profile_image = profile_data.get('profileImage', profile.profile_image)
            profile.interests = profile_data.get('interests', profile.interests)
            profile.knowledge = profile_data.get('knowledge', profile.knowledge)
            profile.saved_civilizations = profile_data.get('savedCivilizations', profile.saved_civilizations)

            db.session.commit()
            return jsonify({"message": "Profile saved successfully"}), 200

        elif request.method == 'DELETE':
            profile = Profile.query.filter_by(user_id=user_id).first()
            if profile:
                db.session.delete(profile)
                db.session.commit()
            return jsonify({"message": "Profile deleted successfully"}), 200

        else:
            return jsonify({"message": "Method not allowed"}), 405

    except Exception as e:
        app.logger.error(f"Error handling profile route: {e}")
        return jsonify({"message": "Internal server error"}), 500

# Route for user signup
@app.route('/auth/signup', methods=['POST'])
def signup():
    data = request.json  # Assuming JSON payload
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    pin = data.get('pin')

    if not username or not email or not password or not pin:
        return jsonify({'error': 'Username, email, password, and pin are required'}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400

    new_user = User(username=username, email=email)
    new_user.set_password(password)
    new_user.set_pin(pin)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)
    refresh_token = create_refresh_token(identity=new_user.id)

    return jsonify({
        'message': 'Signup successful',
        'access_token': access_token,
        'refresh_token': refresh_token
    }), 200

# Route for user login
@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json  # Assuming JSON payload
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid username or password'}), 401

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    return jsonify({
        'access_token': access_token,
        'refresh_token': refresh_token
    }), 200

# Route for pin confirmation
@app.route('/auth/pin-confirm', methods=['POST'])
@jwt_required()
def pin_confirm():
    data = request.json
    pin = data.get('pin')
    user_id = get_jwt_identity()

    user = User.query.get(user_id)
    if user and user.check_pin(pin):
        return jsonify({'message': 'Pin confirmed successfully'}), 200
    else:
        return jsonify({'error': 'Invalid pin'}), 401

if __name__ == '__main__':
    app.run(debug=True, port=5555)
