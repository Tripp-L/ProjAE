import logging
from flask import Blueprint, request, jsonify, session
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User, Profile
from flask_cors import cross_origin

user_bp = Blueprint('user_bp', __name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@user_bp.route('/signup', methods=['POST'])
@cross_origin()
def signup():
    logger.debug("Signup endpoint hit")
    data = request.json
    logger.debug(f"Received data: {data}")
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    pin = data.get('pin')

    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({'message': 'Username or email already exists'}), 400

    try:
        new_user = User(username=username, email=email)
        new_user.set_password(password)
        new_user.set_pin(pin)  # Ensure this line uses set_pin
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        logger.error(f"Error creating user: {str(e)}")
        return jsonify({'message': str(e)}), 500


@user_bp.route('/login', methods=['POST'])
@cross_origin()
def login():
    logger.debug("Login endpoint hit")
    data = request.json
    logger.debug(f"Received data: {data}")
    username = data.get('username')
    password = data.get('password')

    try:
        user = User.query.filter_by(username=username).first()
        logger.debug(f"User found: {user}")

        if user and user.check_password(password):
            session['user_id'] = user.id
            logger.debug("Login successful, PIN required")
            return jsonify({'message': 'Login successful', 'pin_required': True}), 200
        else:
            logger.debug("Invalid username or password")
            return jsonify({'message': 'Invalid username or password'}), 401
    except Exception as e:
        logger.error(f"Error during login: {str(e)}")
        return jsonify({'message': str(e)}), 500


@user_bp.route('/verify_pin', methods=['POST'])
@cross_origin()
def verify_pin():
    logger.debug("Verify PIN endpoint hit")
    data = request.json
    logger.debug(f"Received data: {data}")
    pin = data.get('pin')

    user_id = session.get('user_id')
    if not user_id:
        logger.debug("User not logged in")
        return jsonify({'message': 'User not logged in'}), 401

    try:
        user = User.query.get(user_id)
        logger.debug(f"User found: {user}")

        if user and user.check_pin(pin):
            access_token = create_access_token(identity=user.id)
            logger.debug("PIN verified successfully")
            return jsonify({'access_token': access_token, 'message': 'PIN verified successfully'}), 200
        else:
            logger.debug("Invalid PIN")
            return jsonify({'message': 'Invalid PIN'}), 401
    except Exception as e:
        logger.error(f"Error during PIN verification: {str(e)}")
        return jsonify({'message': str(e)}), 500



@user_bp.route('/profile', methods=['GET'])
@cross_origin()
@jwt_required()
def get_profile():
    logger.debug("Get profile endpoint hit")
    user_id = get_jwt_identity()
    profile = Profile.query.filter_by(user_id=user_id).first()

    if not profile:
        logger.debug("Profile not found")
        return jsonify({'message': 'Profile not found'}), 404

    logger.debug(f"Profile found: {profile}")
    return jsonify({
        'profileName': profile.profile_name,  # Add this line
        'profileImage': profile.profile_image,
        'interests': profile.interests,
        'knowledge': profile.knowledge,
        'savedCivilizations': profile.saved_civilizations
    }), 200


@user_bp.route('/profile', methods=['POST'])
@cross_origin()
@jwt_required()
def create_profile():
    logger.debug("Create profile endpoint hit")
    data = request.json
    user_id = get_jwt_identity()

    try:
        profile = Profile(
            user_id=user_id,
            profile_name=data.get('profileName'),  # Add this line
            profile_image=data.get('profileImage'),
            interests=data.get('interests'),
            knowledge=data.get('knowledge'),
            saved_civilizations=data.get('savedCivilizations')
        )
        db.session.add(profile)
        db.session.commit()
        logger.debug("Profile created successfully")
        return jsonify({'message': 'Profile created successfully'}), 201
    except Exception as e:
        logger.error(f"Error creating profile: {str(e)}")
        return jsonify({'message': str(e)}), 500


@user_bp.route('/profile', methods=['PATCH'])
@cross_origin()
@jwt_required()
def update_profile():
    logger.debug("Update profile endpoint hit")
    data = request.json
    user_id = get_jwt_identity()
    profile = Profile.query.filter_by(user_id=user_id).first()

    if not profile:
        logger.debug("Profile not found")
        return jsonify({'message': 'Profile not found'}), 404

    try:
        profile.profile_name = data.get('profileName', profile.profile_name)  # Add this line
        profile.profile_image = data.get('profileImage', profile.profile_image)
        profile.interests = data.get('interests', profile.interests)
        profile.knowledge = data.get('knowledge', profile.knowledge)
        profile.saved_civilizations = data.get('savedCivilizations', profile.saved_civilizations)
        db.session.commit()
        logger.debug("Profile updated successfully")
        return jsonify({'message': 'Profile updated successfully'}), 200
    except Exception as e:
        logger.error(f"Error updating profile: {str(e)}")
        return jsonify({'message': str(e)}), 500


@user_bp.route('/profile', methods=['DELETE'])
@cross_origin()
@jwt_required()
def delete_profile():
    logger.debug("Delete profile endpoint hit")
    user_id = get_jwt_identity()
    profile = Profile.query.filter_by(user_id=user_id).first()

    if not profile:
        logger.debug("Profile not found")
        return jsonify({'message': 'Profile not found'}), 404

    try:
        db.session.delete(profile)
        db.session.commit()
        logger.debug("Profile deleted successfully")
        return jsonify({'message': 'Profile deleted successfully'}), 200
    except Exception as e:
        logger.error(f"Error deleting profile: {str(e)}")
        return jsonify({'message': str(e)}), 500
