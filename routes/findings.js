const express = require('express');
const router = require('express-promise-router')();

const findingsController = require('../controllers/findings');

router.route('/')
    .get(findingsController.get)
    .post(findingsController.createFinding);

module.exports = router;