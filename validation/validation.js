//VALIDATION
const Joi = require('joi');
//register validation 
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        repeat_password: Joi.ref('password')
    });
    return schema.validate(data);
};

const schemaLoginToken = Joi.object({
    token: Joi.string().required(),
});

const schemaLogin = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});

const loginValidation = (data) => {
    if (data.token) return schemaLoginToken.validate(data)
    return schemaLogin.validate(data);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;