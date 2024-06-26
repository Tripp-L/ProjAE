from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

from .user import User
from .profile import Profile  # Ensure this line imports the Profile model

__all__ = ["User", "Profile"]  # Add Profile to the __all__ list if you use it for imports


