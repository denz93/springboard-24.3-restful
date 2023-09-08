from models import Cupcake
from db import db
import inspect

def find(limit=20):
  return db.session.query(Cupcake).limit(limit).all()

def find_by_id(id):
  return db.session.get(Cupcake, id)

def create(cupcake: dict):
  cake = Cupcake.from_dict(cupcake)

  db.session.add(cake)
  db.session.commit()
  return cake

def update(cupcake: dict):
  cake = db.session.get(Cupcake, cupcake['id'])
  if not cake:
    return None 
  
  attrs = inspect.get_annotations(Cupcake)
  for attr_name in attrs.keys():
    if attr_name in cupcake:
      setattr(cake, attr_name, cupcake[attr_name])
  db.session.commit()
  return cake 

def delete(id):
  deleted = db.session.query(Cupcake).where(Cupcake.id == id).delete() > 0
  if deleted:
    db.session.commit()
  return deleted