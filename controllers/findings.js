const Finding = require('../models/finding');

module.exports = {

    get: async (req, res, next) => {
        const findings = await Finding
            .find({})
            .populate('ingredient', '_id name description')
            .populate('user', '_id username');
        res.status(200).json(findings);
    },

    createFinding: async (req, res, next) => {
        const newFinding = new Finding(req.body);
        const finding = await newFinding.save();
        res.status(201).json(finding);
    }

};