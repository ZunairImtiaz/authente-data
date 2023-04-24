const Joi = require('joi');

const signupDto = Joi.object().keys({
    email: Joi.string().email().lowercase().required(),
    name: Joi.string().min(3).max(20).required(),
    age: Joi.number(),
    password: Joi.string().min(6).max(15).required()
});

const editUserDto = Joi.object().keys({
    name: Joi.string().min(3).max(20),
    email: Joi.string().email().lowercase(),
    age: Joi.number()
});

const editPasswordDto = Joi.object().keys({
    currentPassword: Joi.string().min(6).max(15).required(),
    newPassword: Joi.string().min(6).max(15).required()
});

const createItemDto = Joi.object().keys({
    name: Joi.string().min(3).max(25).required(),
    description: Joi.string().max(66).min(0),
    price: Joi.number().required(),
    quantity: Joi.number().required()
});

const updateItemDto = Joi.object().keys({
    name: Joi.string().min(3).max(25),
    description: Joi.string().min(0),
    price: Joi.number().min(0),
    quantity: Joi.number().min(0)
});

function authDtoValidator(validator) {
    return async function(req,res,next) {
        try {
            const validateBody = await validator.validateAsync(req.body);
            req.body = validateBody;
            next();
        } catch (error) {
            if (error.isJoi) return res.status(422).send(error);
            res.send(error);
        };
    };
};

module.exports = { authDtoValidator, signupDto, editUserDto, editPasswordDto, createItemDto, updateItemDto };