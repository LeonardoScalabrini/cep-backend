# cep-backend

## .env

#PORT
PORT=9090

#MongoDB string connection
STRING_CONNECTION_DB=mongodb://127.0.0.1:27017/correios

## Dev quick start ##

1. Install packages
````
npm install
````

2. Install MongoDB
````
docker-compose up
````

3. Create .env file

4. Start locally
````
npm start
````

## Run the tests ##

1. Install packages
````
npm install
````

2. Install MongoDB
````
docker-compose up
````

3. Run tests
````
npm test 
````

docker run -d -e POSTGRES_PASSWORD=clair -e POSTGRES_USER=clair -e POSTGRES_DB=clair -p 5432:5432 --name postgres postgres:9.6 postgres
docker run -d -p 6060:6060 --name clair --link postgres:postgres -v $PWD/clair_config:/config quay.io/coreos/clair:v4.3.6 -conf=/config/config.yaml
