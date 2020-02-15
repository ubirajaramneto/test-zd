<p align="center">
  <a href="https://www.ze.delivery/" target="blank"><img src="https://courier-images-web.imgix.net/static/img/logo.png?auto=compress,format&fit=max&w=undefined&h=undefined&dpr=2&fm=png" width="320" alt="Nest Logo" /></a>
</p>

## Description

An api demo for the awesome Zé Delivery engineering team \o/

## Installation

```bash
$ npm install
```

## Running and deploying the app

```
docker-compose up
```

You can access the api at the [Api Endpoint](http://localhost:3000/pos)

If you want to deploy it to an AWS ECS Cluster, please refer to the following docs: 
https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cmd-ecs-cli-compose.html

## Test

This project was setup to work with docker, so in order for the tests to work,
the docker container with the postgis (https://hub.docker.com/r/kartoza/postgis/) instance must be running, so lets 
go step by step on how to make the tests run correctly.

__1__ - Make sure the docker container for both the app and the database is running:
```bash
docker-compose up
```

__2__ - After the containers are up and running, change the `ormconfig.json` file contents
to this:
```json
{
  "type": "postgres",
  "host": "0.0.0.0",
  "port": 25432,
  "username": "root",
  "password": "root",
  "database": "test",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```

> ___*Samples have been provided at the ormconfig.sample.txt file.*___

__3-__ At this point you can run the tests without any problems

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Documentation

In order to generate the documentation for this project, please run the following

```bash
npm install
npx compodoc -p tsconfig.json -s
```

Once it is done, visit the url displayed at the bottom line.

## Swagger
The swagger documentation can be viewed at: http://localhost:3000/api

## Additional Information

You can use the following website to help in the testing of the features: 
http://geojson.io/#map=2/20.0/0.0

This project was built with [Nest.js](https://docs.nestjs.com/)

This project uses Nest.js CRUD plugin 
(https://github.com/nestjsx/crud, https://docs.nestjs.com/recipes/crud-utilities)
in order to make pagination and filtering available to all endpoints.

The database used for this project is [PostGis](https://postgis.net/) 

The node version used to develop this application was node.js version v12.10.0

## Author
Ubirajara Marsicano Neto

## License

  Nest is [MIT licensed](LICENSE).
