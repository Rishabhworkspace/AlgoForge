import dotenv from "dotenv";
dotenv.config();

const requiredEnv = [
    "PORT",
    "MONGO_URI",
    "JWT_SECRET",
    "GOOGLE_CLIENT_ID",
    "CLIENT_URL",
    "GEMINI_API_KEY"
]

requiredEnv.forEach((key) => {
    if(!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
})

export const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_URL: process.env.CLIENT_URL,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY
}