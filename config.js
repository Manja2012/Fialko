import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: process.env.PORT,
  mongoURI: process.env.MONGODB_URL,
  token: process.env.TOKEN,
  mailPassword: process.env.MAIL_PASSWORD,
  mailUser: process.env.MAIL_USER,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
}