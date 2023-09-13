FROM python:3.10-slim

RUN mkdir /app
WORKDIR /app 
COPY . .
RUN mkdir -p $HOME/.postgresql
RUN mkdir -p /home/.postgresql

RUN cp ./postgresql/root.crt $HOME/.postgresql/root.crt 
RUN cp ./postgresql/root.crt /home/.postgresql/root.crt 

RUN pip install -r requirements.txt
CMD gunicorn -b "0.0.0.0:5000"  --timeout 0 -w 2 "run:create_app()"

