# GoStack Challenge 09

![GymPoint](https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-03/master/.github/logo.png)

![GitHub language count](https://img.shields.io/github/languages/count/GiovaniCuenca/GoStack-Challenge09) ![GitHub issues](https://img.shields.io/github/issues/GiovaniCuenca/GoStack-Challenge09) ![GitHub](https://img.shields.io/github/license/GiovaniCuenca/GoStack-Challenge09)

## About the Challenge

Develop the Front-End which will consume the API created in challenge 03.
[Oficial challenge README](https://github.com/Rocketseat/bootcamp-gostack-desafio-03/blob/master/README.md#desafio-03-continuando-aplica%C3%A7%C3%A3o)

## Technologies

- **Frameworks**: ReactJS

## Features

- Front-End Development

## Installation

Requirements:
Docker;
Node.JS v10.15 or higher,
Yarn v1.12 or higher,

Clone or download the back-end zip file. At the project folder run the following at your terminal:

    # Install Dependencies:
    $ yarn

    # Start Postgres:
    $ docker run --name postgresgympoint -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11

    # Start Redis:
    $ docker run --name redisgympoint -p 6379:6379 -d -t redis:alpine

    # Create a new Database named 'gympoint' and run the following:
    $ yarn sequelize db:migrate
    $ yarn sequelize db:seed:all

    # Run the Server:
    $ yarn dev

    # Run Nodemailer:
    $ yarn queue

Clone or download the front-end zip file. At the project folder run the following at your terminal:

    # Install Dependencies:
    $ yarn

    # Run the Server:
    $ yarn Start


## License

This project is under the MIT license. See the [LICENSE](https://github.com/GiovaniCuenca/GoStack-Challenge09/blob/master/LICENSE) for more information.
