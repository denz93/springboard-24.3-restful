"""Models for Cupcake app."""
from sqlalchemy.orm import DeclarativeBase, Mapped
from sqlalchemy.types import Integer, String, VARCHAR, Float
from sqlalchemy.schema import Column
import inspect
from json import JSONEncoder, dumps
from db import db 

class Cupcake(db.Model):
  __tablename__ = "cupcakes"
  id: Mapped[Integer] = Column(Integer, autoincrement=True, primary_key=True)
  flavor: Mapped[String] = Column(VARCHAR(100), nullable=False)
  size: Mapped[String] = Column(VARCHAR(100), nullable=False)
  rating: Mapped[Float] = Column(Float, nullable=False)
  image: Mapped[String] = Column(VARCHAR(1000), nullable=False, default="https://tinyurl.com/demo-cupcake")

  @classmethod
  def from_dict(cls, dict_like: dict):
    attrs = inspect.get_annotations(Cupcake)
    cake = Cupcake()

    for key, value in dict_like.items():
      if key not in attrs:
        continue
      setattr(cake, key, value)

    return cake
  
  def to_dict(self):
    print('default called')
    attrs = inspect.get_annotations(Cupcake)
    json = {}
    for key in attrs.keys():
      json[key] = getattr(self, key)
    return json
