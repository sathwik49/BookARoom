import getEnv from "../utils/getEnv";

const appConfig = {
  NODE_ENV: getEnv("NODE_ENV"),
  PORT: getEnv("PORT"),
  BASE_PATH: getEnv("BASE_PATH"),
  DATABASE_URL: getEnv("DATABASE_URL"),
  FRONTEND_ORIGINS: JSON.parse(getEnv("FRONTEND_ORIGINS") || "[]") as string[],
  PROD_FRONTEND_ORIGIN: getEnv("PROD_FRONTEND_ORIGIN"),
  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  JWT_COOKIE_NAME: getEnv("JWT_COOKIE_NAME"),
};

export default appConfig;
