const dotenv = require("dotenv");
dotenv.config();

const { URI, PORT, RIOT } = process.env;

module.exports = { URI, PORT, RIOT};
