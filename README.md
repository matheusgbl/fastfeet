<img src="https://user-images.githubusercontent.com/55060810/94372437-c9e10980-00d3-11eb-86a2-b12a05d1f937.png" alt="FastFeet">


# 🚀 FastFeet - RocketSeat

# 📚 Tutorial

## 🚩 Pré-Requisitos

Para que você consiga executar este projeto, você irá ter instalado em sua máquina os seguintes pacotes:

*[Yarn](https://yarnpkg.com/) (Opcional);
*[NodeJS v10.16 ou maior](https://nodejs.org/en/);
*[Git](https://git-scm.com/);
*[Docker](https://docker.com);
*[Postbirs](https://www.electronjs.org/apps/postbird);

## 💻 Passo-a-Passo

### 1. Clonar o repositório

  $ git clone https://github.com/matheusgbl/fastfeet.git

### 2. Rodar um container utilizando DOCKER

  $ docker run --name fastfeet -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

Caso você já possua um container com Postgres, execute:

  $ docker start "CONTAINER NAME"

Para descobrir o "Container Name" basta executar:

  $ docker ps

### 3. Iniciar o REDIS com docker

  $ docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine

Caso você já possua um container com Redis, basta seguir o mesmo modelo descrito para o Postgres.

### 4. Criar a database pelo PostBird:

  Faça login no postbird e insira os seguintes dados:

  <img src="(https://user-images.githubusercontent.com/55060810/94374422-8772f900-00e2-11eb-8b39-d757dfc11ab0.png)">

  Caso tenha trocado alguma informação, basta trocar os campos na hora de realizar o login.

  Logo após realizar o login na aplicação, basta selecionar "Create Database", conforme segue a imagem, inserir o nome
  desejado e pronto.

  <img src="(https://user-images.githubusercontent.com/55060810/94374461-d15bdf00-00e2-11eb-93f7-fa36ca56febd.png)">

### 5. Rode os seguintes comandos na pasta NODE para dar inicio ao servidor:

  $ cd node

Para instalar as dependências execute:

  $ yarn ou npm install

Para rodar as migrations e as seeds execute nesta ordem:

  $ yarn sequelize db:create ou npx sequelize db:create
  $ yarn sequelize db:migrate npx sequelize db:migrate
  $ yarn sequelize db:seed:all npx sequelize db:seed:all

### 6. Executar o servidor:

  

> GIF Tools

- Use <a href="http://recordit.co/" target="_blank">**Recordit**</a> to create quicks screencasts of your desktop and export them as `GIF`s.
- For terminal sessions, there's <a href="https://github.com/chjj/ttystudio" target="_blank">**ttystudio**</a> which also supports exporting `GIF`s.

**Recordit**

![Recordit GIF](http://g.recordit.co/iLN6A0vSD8.gif)

**ttystudio**

![ttystudio GIF](https://raw.githubusercontent.com/chjj/ttystudio/master/img/example.gif)


## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © <a href="http://fvcproductions.com" target="_blank">FVCproductions</a>.