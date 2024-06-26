import requests
from flask_restful import Resource

class MetArtifact(Resource):
    def get(self, object_id):
        response = requests.get(f'https://collectionapi.metmuseum.org/public/collection/v1/objects/{object_id}')
        data = response.json()
        return {'name': data['objectName'], 'description': data['description']}

class OpenLibraryBooks(Resource):
    def get(self, isbn):
        response = requests.get(f'https://openlibrary.org/isbn/{isbn}.json')
        data = response.json()
        return {'title': data['title'], 'authors': data['authors']}

def init_external_api_routes(api):
    api.add_resource(MetArtifact, '/met/<int:object_id>')
    api.add_resource(OpenLibraryBooks, '/books/<isbn>')
