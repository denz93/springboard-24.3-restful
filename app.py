"""Flask app for Cupcakes"""
from flask import Flask, request, send_from_directory, send_file
from marshmallow import ValidationError
from cupcake_service import *
from helper import bad_request, jsonify
from input_schema import CreateCupcakeInput
from flask_cors import CORS
from uuid import uuid4
from os import path

app = Flask(__name__)
CORS(app)

@app.get('/')
def send_client():
  return send_file('./client-app/dist/index.html')

@app.get('/assets/<path:path>')
def send_assets(path):
  return send_from_directory(f'./client-app/dist/assets', path)


@app.get('/api/cupcakes')
def get_cupcakes():
  cupcakes = find() 
  return jsonify({"cupcakes": cupcakes})

@app.get('/api/cupcakes/<int:id>')
def get_cupcake(id):
  cupcake = find_by_id(id)
  return jsonify({"cupcake": cupcake})

@app.post('/api/cupcakes')
def create_cupcake():
  try:
    cake_input = CreateCupcakeInput().load(request.json)
    cake = create(cake_input)
    return jsonify({"cupcake": cake})
  except ValidationError as err:
    item = list(err.normalized_messages().items())[0]
    field, error_msg = item
    return bad_request(f"'{field}': {error_msg[0]}")

@app.patch('/api/cupcakes/<int:id>')
def update_cupcake(id):
  found = find_by_id(id)
  if not found:
    return bad_request("Cupcake not found")
  try:
    cake_input = CreateCupcakeInput().load(request.json)
    cake_input["id"] = id 
    cake = update(cake_input) 
    return jsonify({"cupcake": cake})
  except ValidationError as err:
    item = list(err.normalized_messages().items())[0]
    field, error_msg = item
    return bad_request(f"'{field}': {error_msg[0]}")


@app.delete('/api/cupcakes/<int:id>')
def delete_cupcake(id):
  success = delete(id)
  if not success:
    return bad_request("Cupcake not found")
  return jsonify({"message": "Deleted"})

@app.post('/api/upload')
def upload_image():
  file = request.files.get('image')
  if not file:
    return bad_request("No image provided")
  id = uuid4().hex
  file_path = path.join('static/upload', f"{id}.{file.mimetype.split('/')[1]}")

  file.save(file_path)
  return jsonify({"url": "/" + file_path})