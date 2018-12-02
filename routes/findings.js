const express = require('express');
const router = require('express-promise-router')();

const findingsController = require('../controllers/findings');

router.route('/')
    .get(findingsController.getAll)
    .post(findingsController.createFinding);

router.route('/:id')
    .put(findingsController.updateFinding)
    .delete(findingsController.deleteFinding);

router.route('/user/:userId')
    .get(findingsController.getByUserId);

module.exports = router;