# Express Sweater Weather

## Introduction

Express Sweater Weather is a minimal API built on Express using JavaScript. It allows pre-existing users to request the forecast of a location, save a location as a favorite, and delete an existing favorite. Requests are validated using an api key tied to each user.

## Tech Stack

- Node.js (13.2.0)
- Express (4.17.1)
- Knex (0.20.8)
- PostgreSQL (1.0.2)
- JavaScript

## Getting started

#### Install necessary dependencies

*Note: This project is built on Express, which requires Node.js. For more information about installing Node.js, see [here](https://nodejs.org/).*

Install necessary dependencies using `npm install` from project root directory.

#### Set up local database

This project uses a PostgreSQL database. Ensure you have Postgres installed (`npm install` should take care of this) and create a new database. The existing knexfile config points to a database called `sweater_weather_dev`. However, this can easily be changed in `/knexfile.js`.

#### Migrate

To migrate, run `knex migrate:latest`. The included seed file at `/db/seeds/dev/users_and_favorites.js` includes 2 users and 2 favorites for each user. To seed, run `knex seed:run`

#### API Keys

This project uses the [Google Geocode API](https://developers.google.com/maps/documentation/geocoding/start) and the [Dark Sky API](https://darksky.net/dev), both of which require api keys to use. [Dotenv](https://github.com/motdotla/dotenv) has been included for securely accessing these keys. To use, simply create a `.env` file in the root directory and store your keys as `key_name=key`. Keys are accessed in the code using `process.env.key_name`.

#### Running a Local Server

To run locally, use `npm start` from the root directory. Requests can then be made to `localhost:3000`.

## Endpoints

Retrieve forecast for specific city:

```
GET /api/v1/forecast?location=city,state (e.g. denver,co)

Body:

{
 "api_key": "key_goes_here"
}
```

Create a favorite:

```
POST /api/v1/favorites

Body:

{
  "location": "Denver, CO",
  "api_key": "key_goes_here"
}
```

List all favorites for a user with current weather for each favorite:

```
GET /api/v1/favorites

Body:

{
  "api_key": "key_goes_here"
}
```

Delete an existing favorite:

```
DELETE /api/v1/favorites

Body:

{
  "location": "Denver, CO",
  "api_key": "key_goes_here"
}
```

**All requests require a valid `api_key` to be specified in the body of the request.**

## Database Schema

Users Table:

![](https://github.com/grwthomps/all-your-base/blob/master/images/sw_users_table.png)

Favorites Table:

![](https://github.com/grwthomps/all-your-base/blob/master/images/sw_favorites_table.png)

## Project Board

[GitHub Project Board](https://github.com/grwthomps/all-your-base/projects/1)

## Core Contributors

[Graham Thompson](https://github.com/grwthomps)
