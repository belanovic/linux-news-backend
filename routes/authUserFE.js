const express = require('express');
const router = express.Router();
const { UserFrontend, validateUserAuth } = require('../models/UserFrontend');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/authOneUserFE', async (req, res) => { 

    const { error } = validateUserAuth(_.pick(req.body, ['username', 'password']));
    if (error) return res.status(400).send([false, 'validation_error', error.details[0].message]);

    const resultUsername = await UserFrontend.findOne({ username: req.body.username });
    if (!resultUsername) return res.status(400).send([false, 'username_error', `Invalid username or password`]);
    
    const resultPassword = await bcrypt.compare(req.body.password, resultUsername.password);
    if (!resultPassword) return res.status(400).send([false, 'password_error', `Invalid username or password`]);

    const token = resultUsername.generateToken();

    try {
        let msg = [true, 'login_successfull', resultUsername, token];
        return res.send(msg);
    }
    catch (err) {
        let msg = ['login_error', err]
        return res.send(msg);
    }
})

module.exports = router;