# A NodeJS Seed Project

## Author

**author**: David S Teles

**email**: david.ds.teles@gmail.com

Hello, my name is David Teles. I'm a software engineer. You can find me on [Linkedin](https://www.linkedin.com/in/david-teles/?locale=en_US). 

Feel free to send me a message.

## About

This project is a simple example of how implement an hexagonal architecture with NodeJS.

You'll find here:

* hexagonal architecture
* 3 tipes of use to illustrate how decoupled things can be powerful.
* Simple CLI to execute the same accountService that API execute but with different context.
* 2 databases to illustrate how not leak framework to application core
* 2 api provider (express and fastify), to show how you can plug and unplug anything to our applicatio ports
* i18n
* eslint
* prettier
* nodemon (for dev only)
* pm2 (production only)
* lint-staged
* jest
* husk

# Environments

This project is provide with a redundant DB and API provider in **main branch**. 

## Express and Mongo

Express and mongo is configured by default in the **main branch**. 
You can change the variables **DB** and **API** to play with this flexibility of change your API provider or your DB provider. 

If you choose one of branches mentionated above, you don't need to worry with this.

```
Environment Vars

DB=mongodb
API=express
```

If this is confused to you, and you want to see things separately, you can browser into different branches.

### For fastify and MySql
```
branch fastify
```

### For Express and Mongodb
```
branch express
```

# How to start

* install docker
* install nodejs

The first thing you need to do is install the app dependecies with command

```
npm install
```

If you want to run the git hooks to show how enforce a project style you need to install and config husk.

```
npm prepare
```

To run the infrastructure dependencies, you need to run docker compose or point the environment var to your own infrastructure.

```
docker compose up
```

## Development

```
npm run dev
curl localhost:8080
```

## test

```
npm run test
```

## Production

```
npm run build
npm run prd
```

# Environment

* **development** vars are exposed in the file: ***nodemon.json***

* **production** vars are exposed in the file: ***ecosystem.config.yml***

