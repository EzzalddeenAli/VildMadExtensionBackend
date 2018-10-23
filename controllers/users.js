const User = require('../models/user');

module.exports = {

    registerUser: async (req, res, next) => {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user);
    }

};