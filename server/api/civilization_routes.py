from flask import Blueprint
from flask_restful import Api, Resource
from models.civilization import Civilization

civilization_bp = Blueprint('civilization_bp', __name__)
civilization_api = Api(civilization_bp)

class CivilizationList(Resource):
    def get(self):
        civilizations = Civilization.query.all()
        return [civ.to_dict() for civ in civilizations], 200

class CivilizationDetail(Resource):
    def get(self, id):
        civilization = Civilization.query.get(id)
        if civilization:
            return civilization.to_dict(), 200
        return {'message': 'Civilization not found'}, 404

civilization_api.add_resource(CivilizationList, '/')
civilization_api.add_resource(CivilizationDetail, '/<int:id>')
