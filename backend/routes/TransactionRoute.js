let express = require("express");
const {
    addTransaction,
    transactionDashboard,
    authMiddleware,
    getTransactions,
} = require("../controllers/TransactionController");

let router = express.Router();

router.use(authMiddleware);
router.post("/add", addTransaction);
router.get("/dashboard", transactionDashboard);
router.get("/", getTransactions);

module.exports = router;
