const express = require('express');
const router = require('express-promise-router')();

const usersController = require('../controllers/users');

router.route('/')
    .get(usersController.getAll)
    .post(usersController.registerUser);

router.route('/login/:user')
    .post(usersController.login);

module.exports = router;