# KNOW YOUR MACROS API

##### Table of Contents
* [Roadmap](#roadmap)
* [About the Setup](#about-the-setup)
* [Local Development Setup](#local-development)
  * [Node version](#local-dev-node-version)
  * [Setup the database](#local-dev-database)


<a name="roadmap" />

## Roadmap

- [x] Sentry error reporting
- [] Email notifications
- [] Machine learning categorize:
  - Snack
  - Post-workout
  - Breakfast
  - Lunch/Dinner
- [x] Machine learning preference
- [] Use machine learning preference to generate combinations meal

<a name="about-the-setup" />

## About the Setup

**Domain registration**

* The domain knowyourmacros.com is registered on DYNDNS
  * Richard Lucas registered the domain and has the username and password

**Deploy**

* The api is deployed on heroku. The heroku app name is
  * Richard Lucas instanciated the heroku app and has the username and password

 The heroku app name is `desolate-stream-17735`

* The deployment method at the time of writing is the heroku-cli:
```bash
heroku push origin master
```

<a name="local-development />

## Local Development Setup

<a name="local-dev-node-version" />

### Node Version

Make sure you are using the node version specified in the [package.json](./package.json) file (`9.11.2`)

### Install dependencies

`npm install` or `yarn install`

<a name="local-dev-database" />

### Install the heroku-cli

### Setup the database

1. Install PostgreSQL on your machine (version 9.5.14)
2. Login to PostgreSQL
```bash
psql
```
3. Create two databases: `kym` and `kym_test`
```sql
create database kym;
create database kym_test;
```
4. Seed the database
```bash
npm run db:seed
```
  * This will syncronize the Sequelize ORM with the database, create the tables, and add the base data

### Setup Redis

Install redis on your machine. I'm using redis-cli version 4.0.10

## Starting the App

```bash
npm run start:dev
```
This will start a cluster of the app using the built in `cluster` package. One worker for each core of your machine.

## Running Tests

```bash
npm run test:server
```
* This should connect to the database `kym_test`
* The test data is located in the `./test-data` directory

For now there is no minimum coverage threshhold, but eventually it should be brought up to 97% or 98% for all metrics.
