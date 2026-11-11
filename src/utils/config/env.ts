import 'dotenv/config';

export const ENV = {
  API_URL: process.env.API_URL ?? 'http://localhost:8000/graphql/',
  CHANNEL: process.env.SALEOR_CHANNEL ?? 'default-channel',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};
