import dotenv from "dotenv";
dotenv.config();

const config = {
  development: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    PORT: process.env.PORT,
  },
  test: {
    DATABASE_URL: process.env.TEST_DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    PORT: process.env.PORT,
  },
};
let variables = config.development;
if (process.env.NODE_ENV === "development") {
  variables = config.development;
} else {
  variables = config.test;
}

export { variables };
