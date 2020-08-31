# Log viewer


## Setup

To run this software locally, you need Docker.
You can start this [docker-compose configuration](./docker-compose.yml),
However it is recommended to use make commands to start the development environment.
 
If you want to start all the services it for the first time,
simply run:

    make up install up logs

Later is enough to run:

    make up logs

This will start development version of the web application on
[localhost:8080](http://localhost:8080).
The backend will be running on [localhost:9090](http://localhost:9090).

These local URLs are configurable through environment variables,
For example [this configuration](./env.penguin.linux.test), 
will make it possible to run this application on a Chromebook,
where "localhost" is not really pointing to the Docker host.
To enable this configuration simply run this command before the `make up`:

    export $(cat .env.penguin.linux.test | xargs)

the same way environment variables could be used to deploy this software
on production hosts. For example this software has been deployed on:
[shortnor.herokuapp.com](https://TODO.herokuapp.com).

## Backend

Backend 
    curl http://localhost:9090?position=0 --output - | jq


### Test with Jest

To run tests on frontend and backend use this command:

    make test

Here is an [example of test output](./docs/jest-example.md).

### Shell into containers

To perform development tasks inside containers,
there are shorthand commands to run bash feom within running containers:

    make into-frontend

    make into-backend
