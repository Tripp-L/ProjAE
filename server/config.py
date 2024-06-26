import os

basedir = os.path.abspath(os.path.dirname(__file__))

# Flask Config
DEBUG = True
SECRET_KEY = 'your_secret_key_here'

# SQLAlchemy Config
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False

# JWT Config
JWT_SECRET_KEY = 'your_jwt_secret_key_here'
