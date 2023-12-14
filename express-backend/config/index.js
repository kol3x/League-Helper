const dotenv = require("dotenv");
dotenv.config();

const { URI, PORT, RIOT, FRONTENDURL } = process.env;

module.exports = { URI, PORT, RIOT, FRONTENDURL};
