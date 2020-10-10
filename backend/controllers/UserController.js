const User = require("../models/UserModel");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const registerValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

const loginValidator = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

const registerUser = async (req, res) => {
    try {
        let { error } = registerValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        let { email, password, name } = req.body;
        let userExists = await User.findOne({ email: email });

        let encryptedPassword = await bcrypt.hash(
            password,
            await bcrypt.genSalt(10)
        );
        if (userExists) {
            throw new Error("Account already exists");
        }

        let newUser = await new User({
            email,
            password: encryptedPassword,
            name,
        });
        await newUser.save();

        res.json({
            error: true,
            message: "User registered",
            email,
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        let { error } = loginValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        let { email, password } = req.body;
        let userExists = await User.findOne({ email: email });

        if (!userExists) {
            throw new Error("Account doesn't exists");
        }

        let passwordCheck = await bcrypt.compare(password, userExists.password);

        if (passwordCheck) {
            res.json({
                auth: email,
                error: false,
                message: "Logged in successfully",
            });
        } else {
            throw new Error("Wrong password");
        }
    } catch (error) {
        res.status(401).json({
            error: true,
            message: error.message,
        });
    }
};

module.exports = { registerUser, loginUser };
