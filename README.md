<div align="center">
    <h1>Task Manager</h1>
    <div><span>CRUD app</span></div>
</div>

# Introduction

Task Manager to stay organized every day.

## Built with

- [![EJS](https://img.shields.io/badge/EJS-20232A?style=for-the-badge&logo=ejs&logoColor=8E64B1)](https://ejs.co/)
- [![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/javascript)
- [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
- [![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
- [![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com)
- [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

# Getting started

## Prerequisites

- Install node.js.
- Install Docker and Docker Compose.

## Installation

1. Clone the repo:

```
git clone https://github.com/ClouddCoder/task-manager.git
```

2. Install the dependencies in the project root:

```
npm install
```

3. Create an `.env` file in the project root:

```
PORT = <SERVER_PORT>
JWT_SECRET = <JWT_PASSWORD> # The backend uses JWT to authenticate the user.

# Database configuration for deployment
DB_USER = <DB_USER_FOR_DEPLOYMENT>
DB_PASSWORD = <DB_PASSWORD_FOR_DEPLOYMENT>
DB_HOST = <DB_HOST_FOR_DEPLOYMENT>
DB_PORT = <DB_PORT_FOR_DEPLOYMENT>
DB_NAME = <DB_NAME_FOR_DEPLOYMENT>
DB_SSL = <1_OR_0> # If your database is hosted in a server, probably you need to set SSL.

# Database configuration for testing
DB_USER_DEV = <DB_USER_FOR_DEVELOPMENT>
DB_PASSWORD_DEV = <DB_PASSWORD_FOR_DEVELOPMENT>
DB_HOST_DEV = <DB_HOST_FOR_DEVELOPMENT>
DB_PORT_DEV = <DB_PORT_FOR_DEVELOPMENT>
DB_NAME_DEV = <DB_NAME_FOR_DEVELOPMENT>
DB_SSL_DEV = <1_OR_0>
```

# Usage

This application can be deployed with docker compose. In the project root start a docker compose:

```
docker compose up
```

Then open a new tab in the browser and type `localhost:3000`.

## Demo

Currently the Task Manager is a Containerized Application deployed with a Dockerfile in Render.com, and the database is hosted in ElephantSQL.

```
https://task-manager-sn3p.onrender.com
```

# Contributors

- [@ClouddCoder](https://github.com/ClouddCoder)
