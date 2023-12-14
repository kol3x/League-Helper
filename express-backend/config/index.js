const dotenv = require("dotenv");
dotenv.config();

const { URI, PORT, RIOT, FRONTEND_URL, REDIS_URL } = process.env;

module.exports = { URI, PORT, RIOT, FRONTEND_URL, REDIS_URL };
