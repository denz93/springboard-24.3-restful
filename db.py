from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from config import getConfig
db = SQLAlchemy()

def db_init(app: Flask):
  config = getConfig()
  print(f"Init database with {config}")
  app.config['SQLALCHEMY_DATABASE_URI'] = config.DATABASE_URI
  with app.app_context() as ctx:
    db.init_app(app)
    db.create_all()
