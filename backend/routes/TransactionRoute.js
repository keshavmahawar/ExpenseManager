let express = require("express");
const { addTransaction } = require("../controllers/TransactionController");

let router = express.Router();

router.post("/add", addTransaction);

module.exports = router;
