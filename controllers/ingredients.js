const Ingredient = require('../models/ingredient');

module.exports = {

    get: async (req, res, next) => {
        const ingredients = await Ingredient
            .find({})
            .populate('user', '_id username');
        res.status(200).json(ingredients);
    },

    createIngredient: async (req, res, next) => {
        const newIngredient = new Ingredient(req.body);
        const ingredient = await newIngredient.save();
        res.status(201).json(ingredient);
    }

};