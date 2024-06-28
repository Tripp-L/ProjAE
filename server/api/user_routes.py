from flask import Blueprint, request, jsonify, session
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token
from models import db, User, Profile
from flask_cors import cross_origin

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/signup', methods=['POST'])
@cross_origin()
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    pin = data.get('pin')

    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({'message': 'Username or email already exists'}), 400

    try:
        new_user = User(username=username, email=email)
        new_user.set_password(password)
        new_user.set_pin(pin)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    try:
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            session['user_id'] = user.id
            return jsonify({'message': 'Login successful', 'pin_required': True}), 200
        else:
            return jsonify({'message': 'Invalid username or password'}), 401
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/verify_pin', methods=['POST'])
@cross_origin()
def verify_pin():
    data = request.json
    pin = data.get('pin')
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({'message': 'User not logged in'}), 401

    try:
        user = User.query.get(user_id)
        if user and user.check_pin(pin):
            access_token = create_access_token(identity=user.id)
            return jsonify({'access_token': access_token, 'message': 'PIN verified successfully'}), 200
        else:
            return jsonify({'message': 'Invalid PIN'}), 401
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/profile', methods=['GET'])
@cross_origin()
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    profile = Profile.query.filter_by(user_id=user_id).first()

    if not profile:
        return jsonify({'message': 'Profile not found'}), 404

    return jsonify(profile.to_dict()), 200

@user_bp.route('/profile', methods=['POST'])
@cross_origin()
@jwt_required()
def create_profile():
    data = request.json
    user_id = get_jwt_identity()

    try:
        profile = Profile(
            user_id=user_id,
            profile_name=data.get('profileName'),
            profile_image=data.get('profileImage'),
            interests=data.get('interests'),
            knowledge=data.get('knowledge'),
            saved_civilizations=data.get('savedCivilizations')
        )
        db.session.add(profile)
        db.session.commit()
        return jsonify({'message': 'Profile created successfully'}), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/profile', methods=['PATCH'])
@cross_origin()
@jwt_required()
def update_profile():
    data = request.json
    user_id = get_jwt_identity()
    profile = Profile.query.filter_by(user_id=user_id).first()

    if not profile:
        return jsonify({'message': 'Profile not found'}), 404

    try:
        profile.profile_name = data.get('profileName', profile.profile_name)
        profile.profile_image = data.get('profileImage', profile.profile_image)
        profile.interests = data.get('interests', profile.interests)
        profile.knowledge = data.get('knowledge', profile.knowledge)
        profile.saved_civilizations = data.get('savedCivilizations', profile.saved_civilizations)
        db.session.commit()
        return jsonify({'message': 'Profile updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/profile', methods=['DELETE'])
@cross_origin()
@jwt_required()
def delete_profile():
    user_id = get_jwt_identity()
    profile = Profile.query.filter_by(user_id=user_id).first()

    if not profile:
        return jsonify({'message': 'Profile not found'}), 404

    try:
        db.session.delete(profile)
        db.session.commit()
        return jsonify({'message': 'Profile deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/refresh', methods=['POST'])
@cross_origin()
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    access_token = create_access_token(identity=user_id)
    return jsonify({'access_token': access_token}), 200
