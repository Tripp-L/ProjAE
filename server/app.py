from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
from api import register_api_blueprints
import os

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
app.config.from_object('config')

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
jwt = JWTManager(app)

# Register blueprints
register_api_blueprints(app)

@app.route('/')
@app.route('/<path:path>')
def serve_react_app(path=""):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)








