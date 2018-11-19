const User = require('../models/user');

module.exports = {

    getAll: async (req, res, next) => {
        const users = await User
            .find({})
            .select('_id username');
        res.status(200).json(users);
    },

    registerUser: async (req, res, next) => {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user);
    }

};