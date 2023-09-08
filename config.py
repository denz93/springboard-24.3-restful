from os import getenv

class Config:
  DATABASE_URI = getenv('DATABASE_URI') 
  ENV = getenv('ENV', None) 
  SECRET_KEY = getenv('SECRET_KEY', None) 
  def __repr__(self) -> str:
    return f'"{self.ENV}" environment'

class DevConfig(Config):
  DATABASE_URI = 'postgresql:///cupcakes'
  SECRET_KEY = '123'

class TestConfig(Config):
  DATABASE_URI = 'sqlite:///:memory:'
  SECRET_KEY = '123'

class ProdConfig(Config):
  pass

def getConfig() -> Config:
  env = getenv('ENV')
  config = None
  if not env:
    raise f"Missing 'ENV' environment variable"
  if env == 'DEV':
    config = DevConfig()
  elif env == 'TEST':
    config = TestConfig()
  elif env == 'PROD':
    config = ProdConfig()
  else:
    raise f"ENV={env} is not valid. Should be TEST, DEV, PROD"
  return config