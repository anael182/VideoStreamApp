import dotenv from "dotenv"
dotenv.config()

export default {
  secret: process.env.SECRET,
  tokenDuration: process.env.TOKEN_DURATION | "24h",
}
