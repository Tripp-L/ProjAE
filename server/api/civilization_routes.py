from flask import Blueprint
from flask_restful import Api, Resource

civilization_bp = Blueprint('civilization_bp', __name__)
civilization_api = Api(civilization_bp)

class CivilizationList(Resource):
    def get(self):
        # Implementation for listing civilizations
        pass

class CivilizationDetail(Resource):
    def get(self, id):
        # Implementation for getting civilization details
        pass

civilization_api.add_resource(CivilizationList, '/')
civilization_api.add_resource(CivilizationDetail, '/<int:id>')

