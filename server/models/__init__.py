from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

from .user import User
from .profile import Profile
from .civilization import Civilization
from .artifact import Artifact
from .event import Event
from .region import Region
from .saved_civs import SavedCivilization

__all__ = ["User", "Profile", "Civilization", "Artifact", "Event", "Region", "SavedCivilization"]
