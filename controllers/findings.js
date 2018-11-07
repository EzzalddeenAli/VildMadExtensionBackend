const Finding = require('../models/finding');

module.exports = {

    getAll: async (req, res, next) => {
        const findings = await Finding
            .find({})
            .populate('ingredient', '_id name description')
            .populate('user', '_id username');
        res.status(200).json(findings);
    },

    getByUserId: async (req, res, next) => {
        let userId = req.params.userId;
        const userFindings = await Finding
            .find({ 'user': userId })
            .populate('ingredient', '_id name description')
            .populate('user', '_id username');
        res.status(200).json(userFindings);
    },

    createFinding: async (req, res, next) => {
        const newFinding = new Finding(req.body);
        const finding = await newFinding.save();
        res.status(201).json(finding);
    },

    deleteFinding: async (req, res, next) => {
        let findingId = req.params.id;
        await Finding.findOneAndDelete(findingId);
        res.status(204).json();
    }

};