from flask import Blueprint
from flask_restful import Api, Resource

artifact_bp = Blueprint('artifact_bp', __name__)
artifact_api = Api(artifact_bp)

class ArtifactList(Resource):
    def get(self):
        # Implementation for listing artifacts
        pass

class ArtifactDetail(Resource):
    def get(self, id):
        # Implementation for getting artifact details
        pass

artifact_api.add_resource(ArtifactList, '/')
artifact_api.add_resource(ArtifactDetail, '/<int:id>')
