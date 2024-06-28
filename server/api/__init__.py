def register_api_blueprints(app):
    from .user_routes import user_bp
    app.register_blueprint(user_bp, url_prefix='/auth')

    from .artifact_routes import artifact_bp
    app.register_blueprint(artifact_bp, url_prefix='/api/artifacts')

    from .civilization_routes import civilization_bp
    app.register_blueprint(civilization_bp, url_prefix='/api/civilizations')
