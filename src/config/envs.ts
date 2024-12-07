import "dotenv/config";

import * as joi from "joi";

interface EnvVars {
  PORT: number;
  MONGO_URL: string;
  MONGO_DB_NAME: string;
  JWT_SEED: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    MONGO_URL: joi.string().required(),
    MONGO_DB_NAME: joi.string().required(),
    JWT_SEED: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  mongoUrl: envVars.MONGO_URL,
  mongoDbName: envVars.MONGO_DB_NAME,
  jwtSeed: envVars.JWT_SEED,
};
