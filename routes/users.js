const express = require('express');
const router = require('express-promise-router')();

const usersController = require('../controllers/users');

router.route('/')
    .post(usersController.registerUser);

module.exports = router;