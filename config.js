import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: process.env.PORT,
  mongoURI: process.env.MONGODB_URL,
  token: process.env.TOKEN,
  metaPassword: process.env.MAIL_PASSWORD,
  fromEmail:process.env.MAIL_USER
}