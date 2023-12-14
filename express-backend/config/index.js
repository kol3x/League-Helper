const dotenv = require("dotenv");
dotenv.config();

const { URI, PORT, RIOT, FRONTENDURL, REDIS_URL } = process.env;

module.exports = { URI, PORT, RIOT, FRONTENDURL, REDIS_URL };
