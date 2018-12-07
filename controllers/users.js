const User = require('../models/user');

module.exports = {

    getAll: async (req, res, next) => {
        const users = await User
            .find({})
            .select('_id username');
        res.status(200).json(users);
    },

    login: async (req, res, next) => {
        const user = await User
            .findOne({ 'username': req.params.user })
            .select('_id username');

        if (!user) {
            return res.status(404).json();
        }

        res.status(200).json(user);
    },

    registerUser: async (req, res, next) => {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user);
    }

};