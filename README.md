<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">Database AI</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

</div>

---

<p align="center"> An API under construction, about responding to Databases, in an intelligent way
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
  - [PostgreSQL](#PostgreSQL)
  - [SQLite](#SQLite)
  - [Prisma Migrations](#prisma-migrations)
  - [Open AI Key](#openai-key)
- [Usage](#usage)
  - [Developed Routes](#developed-routes)
    - [User Routes](#user-routes)
    - [Files Routes](#files-routes)
- [Built Using](#built_using)
- [Authors](#authors)

<br>

# 🧐 About <a name = "about"></a>

An API under construction, about responding to Databases, in an intelligent way

<br><br>

# 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

1. NodeJS
2. Yarn
3. Docker (if using PostgreSQL)

<br>

Start by installing all dependencies

```
yarn install
```

<br>

## 📦 Initializing Database

We are using a [PostgreSQL](#PostgreSQL) database as our official production database.

You can use [SQLite](#SQLite) to run faster and easier in a development environment.

Follow the instructions bellow:

<br>

### ⤵️ PostgreSQL Installation: <a name="PostgreSQL"></a>

1.  Create a PostgreSQL Docker:

        $ docker run --name db_ai_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

2.  Initialize the Docker:

        $ docker ps -a
        $ docker start ID

3.  Create a main_table insite the PostgreSQL (you can use DBeaver)

4.  Create a .env file inside ./backend folder, and complete:

        # postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA

        DATABASE_URL="postgresql://postgres:docker@localhost:5432/main_table?schema=public"

<br>

### ⤵️ SQLite Installation<a name="SQLite"></a>

1.  Just create a `.env`` file inside ./backend folder, and complete:

        DATABA_URL="file:./dev.db"

2.  Change the `datasource db` inside `primsa/schema.primsa` to:

        datasource db {
          provider = "sqlite"
          url      = env("DATABASE_URL")
        }

<br>

### 👾 Run Prisma Migrations <a name="prisma-migrations"></a>

    $ yarn prisma migrate dev

<br>

### 🧠 Setting OpenAi API Key <a name="openai-key"></a>

Genereta an API Key in OpenAI website.

Inside `.env` file paste:

    OPENAI_API_KEY="sk-YOU-API-KEY"

<br>

### 🔧 Initializing Server <a name = "tests"></a>

Just run our Yarn script:

    $ yarn dev

<br>

---

# 💪 Usage <a name="usage"></a>

To developers: It is important to add new routes to this `README.md`` so that new routes are easily understood.

<br>

## 🛜 Developed Routes <a name="developed-routes"></a>

### ⤵️ Users <a name="user-routes"></a>

#### Create User

- Type: `POST`
- Link: `_.baseURL/users`
- JSON:

      {
        "name": "User Name",
        "email": "user@mail.com",
        "password": "UserPass"
      }

<br>

#### Authenticate User

- Type: `POST`
- Link: `_.baseURL/sessions`
- JSON:

      {
        "email": "user@mail.com",
        "password": "UserPass"
      }

<br>

### ⤵️ Files <a name="files-routes"></a>

#### File Uploads

- Type: `POST`
- Link: `_.baseURL/files/upload`
- Authentication: `Bearer JWT`
- Multipart: `uploaded_file` + FILE_TO_UPLOAD

<br>

#### File Question Answer

- Type: `POST`
- Link: `_.baseURL/files/ask`
- Authentication: `Bearer JWT`
- JSON:

      {
        "query": "Your Question"
      }

<br>

---

## 🚀 Deployment <a name = "deployment"></a>

Not deployed yet.

<br>

## ⛏️ Built Using <a name = "built_using"></a>

- [PostgreSQL](https://www.postgresql.org/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [TypeScript](https://www.typescriptlang.org/) - Server Development
- [LangChain](https://www.langchain.com/) - AI-first toolkit
- [OpenAI API](https://openai.com/blog/openai-api) - Large Language Model

<br>

## ✍️ Authors <a name = "authors"></a>

- [@oGabrielFreitas](https://github.com/oGabrielFreitas)
- [@vbsantos](https://github.com/vbsantos)
