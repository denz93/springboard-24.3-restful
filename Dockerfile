FROM python:3.10-slim

RUN mkdir /app
WORKDIR /app 
COPY . .
RUN pip install -r requirements.txt
CMD gunicorn -b "0.0.0.0:5000"  --timeout 0 -w 2 "run:create_app()"

