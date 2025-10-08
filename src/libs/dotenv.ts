import dotenv from 'dotenv';

export const env =
  dotenv.config({
    quiet: true,
  }).parsed || {};
