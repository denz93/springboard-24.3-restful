from app import app
from db import db_init
from os import path , makedirs
from uuid import uuid4

def mk_upload_dir():
  upload_path = './static/upload'
  if not path.exists(upload_path):
    makedirs(upload_path)

def generate_random_serect():
  rand = uuid4().hex
  print(f"random serect key: {rand}. Just for convenience")
def create_app():
  db_init(app)
  mk_upload_dir()
  generate_random_serect()
  return app
