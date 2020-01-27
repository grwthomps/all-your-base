// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/sweater_weather_dev',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/sweater_weather_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: 'postgres://dfueewgogwwbaj:9bfccf9b4efcc5d9f7aeee86d6f5c111d070ecafc4f5040064706c0feb312072@ec2-23-21-13-88.compute-1.amazonaws.com:5432/daf9ap18n6j5ik',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
