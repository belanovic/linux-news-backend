const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userFrontendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    username: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        maxLength: 1024,
        required: true
    },
    email: {
        type: String,
        minLength: 10,
        maxLength: 60,
        required: true
    },
    profileImgURLLarge: {
        type: String,
        minLength: 7,
        maxLength: 10000,
        required: true
    },
    profileImgNameLarge: {
        type: String,
        minLength: 7,
        maxLength: 10000,
        required: true
    },
    profileImgURLSmall: {
        type: String,
        minLength: 7,
        maxLength: 10000,
        required: true 
    },
    profileImgNameSmall: {
        type: String,
        minLength: 7,
        maxLength: 10000,
        required: true
    }    

})

userFrontendSchema.methods.generateToken = function () {
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token
}

const UserFrontend = mongoose.model('UserFrontend', userFrontendSchema);

function validateUser(user) {
    const schema = Joi.object( {
        firstName: Joi.string().min(3).max(50).required(),
        lastName:  Joi.string().min(3).max(50).required(),
        username:  Joi.string().min(3).max(50).required(),
        password:  Joi.string().min(6).max(255).required(),
        email:  Joi.string().min(10).max(60).email().required(),
        profileImgNameLarge: Joi.string().min(7).max(10000).required(),
        profileImgURLLarge: Joi.string().min(7).max(10000).required(),
        profileImgURLSmall: Joi.string().min(7).max(10000).required(),
        profileImgNameSmall: Joi.string().min(7).max(10000).required()
    })
    return schema.validate(user);
}
function validateUserAuth(userAuth) {
    const schema = Joi.object( {
        username:  Joi.string().min(3).max(50).required(),
        password:  Joi.string().min(6).max(255).required()
    })
    return schema.validate(userAuth);
}

module.exports.UserFrontend = UserFrontend;
module.exports.validateUser = validateUser;
module.exports.validateUserAuth = validateUserAuth;

/* const schema = Joi.object({ name: Joi.string() .min(6) .required(),
    email: Joi.string() .min(6) .required() .email(),
    password: Joi.string() .min(6) .required() });
    
    const validation = schema.validate(req.body);
    res.send(validation); */