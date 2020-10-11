let express = require("express");
const {
    addTransaction,
    transactionDashboard,
    authMiddleware,
} = require("../controllers/TransactionController");

let router = express.Router();

router.use(authMiddleware);
router.post("/add", addTransaction);
router.get("/dashboard", transactionDashboard);
router.get("/", transactionDashboard);

module.exports = router;
