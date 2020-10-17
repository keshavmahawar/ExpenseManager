const Transaction = require("../models/TransactionModel");
const User = require("../models/UserModel");
const Joi = require("joi");

const transactionValidator = (data) => {
    const schema = Joi.object({
        type: Joi.string().valid("credit", "debit"),
        title: Joi.string().min(3).required(),
        amount: Joi.number().required(),
    });
    return schema.validate(data);
};

const transactionParser = (parsingData) => {
    function parse(transaction) {
        let { id, type, title, timestamp, amount } = transaction;
        return {
            id,
            type,
            title,
            timestamp,
            amount,
        };
    }
    if (Array.isArray(parsingData)) return parsingData.map(parse);
    else return parse(parsingData);
};

const authMiddleware = async (req, res, next) => {
    try {
        let user = req.get("Authorization");
        let userExists = await User.findOne({ email: user });

        if (!userExists) {
            throw new Error("Invalid authorization");
        }

        req.user_id = userExists._id;
        next();
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message,
        });
    }
};

const transactionDashboard = async (req, res) => {
    try {
        const creditDebit = await Transaction.aggregate([
            { $match: { user_id: req.user_id } },
            { $group: { _id: "$type", totalAmount: { $sum: "$amount" } } },
        ]);

        const recentTransactions = await Transaction.aggregate([
            { $match: { user_id: req.user_id } },
            { $sort: { timestamp: -1 } },
        ]).limit(5);

        const result = {};

        result.transactions = transactionParser(recentTransactions);

        for (let i = 0; i < creditDebit.length; i++) {
            const group = creditDebit[i];
            result[group._id] = group.totalAmount;
        }
        if (!result.credit) result.credit = 0;
        if (!result.debit) result.debit = 0;

        res.json(result);
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message,
        });
    }
};

const addTransaction = async (req, res) => {
    try {
        let { error } = transactionValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        let { type, title, amount } = req.body;

        let newTransaction = await new Transaction({
            user_id: req.user_id,
            type,
            title,
            amount,
        }).save();

        res.json(transactionParser(newTransaction));
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message,
        });
    }
};

const getTransactions = async (req, res) => {
    try {
        let { type, page } = req.query;

        page = Number(page) || 1;
        type = type !== "credit" && type !== "debit" ? { $exists: true } : type;
        let limit = 20;
        let count = await Transaction.find({
            user_id: req.user_id,
            type,
        }).countDocuments();

        let result = {};
        result.error = false;
        result.pageNo = page;
        result.totalPage = Math.ceil(count / limit);
        result.totalCount = count;

        const transactions = await Transaction.aggregate([
            { $match: { user_id: req.user_id, type } },
            { $sort: { timestamp: -1 } },
        ])
            .skip((page - 1) * limit)
            .limit(limit);
        result.transactions = transactionParser(transactions);

        res.json(result);
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message,
        });
    }
};

module.exports = {
    authMiddleware,
    addTransaction,
    transactionDashboard,
    getTransactions,
};
