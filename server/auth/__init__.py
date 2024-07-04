from flask import Blueprint

auth_bp = Blueprint('auth', __name__)

# Import views to register routes
from . import views
