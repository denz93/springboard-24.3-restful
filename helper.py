from json import JSONEncoder, dumps
from typing import Any

from flask import Response

from models import Cupcake
class JSONSerialize(JSONEncoder):
  def default(self, o: Any) -> Any:
    if isinstance(o, Cupcake):
      return o.to_dict()
    return super().default(o)
  
def jsonify(obj: Any):
  return Response(response=dumps(obj, cls=JSONSerialize), status=200, content_type='application/json')

def bad_request(message, code=400, status=400): 
  return Response(response=dumps({"code": code, "message": message}), status=status, content_type='application/json')
