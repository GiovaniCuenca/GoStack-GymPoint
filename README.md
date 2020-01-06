  <h1 align="center"> <img alt="Gympoint" title="Gympoint" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png" width="200px" /> </h1>

  <blockquote align="center">Desafio Final do Bootcamp GoStack desenvolvido pela RocketSeat</blockquote>

  <p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/giovanicuenca/gostack-gympoint?color=%2304D361"> <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/giovanicuenca/gostack-gympoint?color=%2304D361"> <a href="https://github.com/giovanicuenca"> <img alt="Made by Giovani Cuenca" src="https://img.shields.io/badge/Made%20by-GiovaniCuenca-%2304D361"> </a>
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/giovanicuenca/gostack-gympoint?color=%2304D361"> <img alt="Stargazers" src="https://img.shields.io/github/stars/giovanicuenca/gostack-gympoint?style=social">
  </p>

## Desafio :rocket:

Desenvolver uma aplicação para gerenciamento de uma academia contendo: </br>

- API e BackEnd utilizando NodeJs;
- FrontEnd utilizando ReactJS;
- Mobile utilizando React-Native;

## Tecnologias :zap:

**BackEnd**

- NodeJS;
- MVC / Express / Sucrase/Nodemon
- JWT / Bcrypt para autenticação
- PostgresSQL / Sequelize / Docker

**FrontEnd**

- ReactJS;
- Redux / Redux Saga /

**Mobile**

- React Native

## Pré-requisitos :clipboard:

- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/lang/en/)
- [Docker](https://www.docker.com/)

## Instalação e execução :cd:

- Faça um clone deste repositório: </br>
  `$ git clone git@github.com/GiovaniCuenca/GoStack-GymPoint.git`

- Acesse a pasta gympoint; </br>

- Acesse a pasta backend, frontend e mobile e rode o comando Yarn em cada uma das pastas para instalar as respectivas dependências; </br>
  `$ yarn`

- Com o docker instalado rode os seguintes comandos para criar os databases; </br>
  `$ docker run --name postgresgympoint -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11` </br>
  `$ docker run --name redisgympoint -p 6379:6379 -d -t redis:alpine` </br>

**OBS:** Como utilizei o Docker Tool do Windows, é necessário alterar o hostname de dois arquivos dentro do backend:
`src/config/database.js - no hostname alterar para: localhost` </br>
`src/config/redis.js - no hostname alterar para: localhost` </br>

- Utilizando o aplicativo \*\*PostBird ou alguma outra ferramente similar crie uma database com o nome de <b>gympoint</b>

- Dentro da pasta <b>backend</b> realize os seguintes comandos:

  - Executar as migrations: </br>
    `$ yarn sequelize db:migrate`

  - Ciar um usuário administrador: </br>
    `$ yarn sequelize db:seed:all`

  - Rodar o servidor: </br>
    `$ yarn dev`

  - Rodar servidor de envio de e-mails: </br>
    `$ yarn queue`

- Dentro da pasta <b>frontend</b> realize o seguinte comando:
  - Rodar o servidor: </br>
    `$ yarn start`
- Dentro da pasta <b>mobile</b> realize o seguinte comando:
  - Instalar o aplicativo no Emulador: </br>
    `$ react-native run-android`

## Emular no celular :vibration_mode:

**PS**: Testado apenas no **Android** pois não tenho acesso a um Mac.

Para conectar-se ao backend, ir no aquivo `mobile/src/services/api.js` e alterar o link da baseURL dependendo do emulador.

Android: </br>
```
Emulador Android Studio: http://10.0.2.2:port
Genymotion: http://10.0.3.2:port
USB: http://<IP DA MAQUINA NA REDE>:3333 | ex: http://192.168.1.107:port
WIFI: http://<IP DA MAQUINA NA REDE>:3333 | ex: http://192.168.1.107:port
```

## Para enviar email: :email:

Cadastre-se no site [Mailtrap](https://mailtrap.io/)</br>
Cria uma inbox em create inbox</br>
<b>SMTP Settings</b> > <b>Integrations</b> escolher <b>Nodemailer</b>, e configurar: host, port, user, pass no arquivo `src/config/mail.js` na pasta backend.


## Web :computer:

Faça o login como administrador</br>
**email:** admin@gympoint.com </br>
**senha:** 123456

## Mobile :iphone:

Entre no aplicativo informando o ID do estudante.</br>
