from marshmallow import Schema, fields, validate

class CreateCupcakeInput(Schema):
  flavor = fields.String(validate=validate.Length(min=1, max=100), required=True)
  size = fields.String(required=True, validate=validate.Length(min=1, max=100))
  rating = fields.Float(required=True, validate=validate.Range(min=0))
  image = fields.String(required=True, validate=validate.Length(min=1, max=1000))