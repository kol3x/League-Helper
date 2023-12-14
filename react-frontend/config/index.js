const dotenv = require("dotenv");
dotenv.config();

const { SERVERURL } = process.env;

module.exports = { SERVERURL };
