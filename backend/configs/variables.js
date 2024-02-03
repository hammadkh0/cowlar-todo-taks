const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    DB_USER: process.env.MONGO_INITDB_ROOT_USERNAME,
    DB_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
    DB_NAME: process.env.LOCAL_DB_NAME,
    DATABASE_URL: process.env.LOCAL_DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    PORT: process.env.PORT,
  },
  test: {
    DB_USER: process.env.MONGO_INITDB_ROOT_USERNAME,
    DB_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
    DB_NAME: process.env.TEST_DB_NAME,
    DATABASE_URL: process.env.LOCAL_TEST_DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    PORT: process.env.PORT,
  },
  production: {
    DB_USER: process.env.MONGO_INITDB_ROOT_USERNAME,
    DB_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
    DB_NAME: process.env.LOCAL_DB_NAME,
    DATABASE_URL: process.env.DOCKER_DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    PORT: process.env.PORT,
  },
};
let variables = config.development;
if (process.env.NODE_ENV === "development") {
  variables = config.development;
} else if (process.env.NODE_ENV === "production") {
  variables = config.production;
} else {
  variables = config.test;
}

module.exports = { variables };
