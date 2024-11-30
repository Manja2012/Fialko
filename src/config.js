import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT,
  mongoURI: process.env.MONGODB_URL,
  tokenSecret: process.env.TOKEN_SECRET,
  clientOrigin: process.env.CLIENT_ORIGIN,
  mailPassword: process.env.MAIL_PASSWORD,
  mailUser: process.env.MAIL_USER,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
  keyStripe: process.env.KEY_STRIPE,
  webAppUrl: process.env.WEB_APP_URL,
  server: process.env.SERVER,
};
