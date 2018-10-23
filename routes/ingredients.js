const express = require('express');
const router = require('express-promise-router')();

const ingredientsController = require('../controllers/ingredients');

router.route('/')
    .get(ingredientsController.get)
    .post(ingredientsController.createIngredient);

module.exports = router;