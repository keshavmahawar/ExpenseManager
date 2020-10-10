const Transaction = require("../models/TransactionModel");
const User = require("../models/UserModel");
const Joi = require("joi");

const transactionValidator = (data) => {
    const schema = Joi.object({
        user: Joi.string().min(4).required(),
        type: Joi.string().valid("credit", "debit"),
        title: Joi.string().min(3).required(),
        amount: Joi.number().required(),
    });
    return schema.validate(data);
};

const addTransaction = async (req, res) => {
    try {
        let { error } = transactionValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        let { user, type, title, amount } = req.body;

        let userExists = await User.findOne({ email: user });
        if (!userExists) {
            throw new Error("Invalid auth");
        }

        const user_id = userExists._id;
        let newTransaction = await new Transaction({
            user_id,
            type,
            title,
            amount,
        }).save();
        res.json(newTransaction);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: true,
            message: error.message,
        });
    }
};

module.exports = { addTransaction };
