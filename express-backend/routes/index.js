const express = require("express");
const router = express.Router();

const index_controller = require("../controllers/indexController");

router.get("/users/:user/:server/matches", index_controller.user_matches);
module.exports = router;
