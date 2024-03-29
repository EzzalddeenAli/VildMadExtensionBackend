const Finding = require('../models/finding');

let self = module.exports = {

    getAll: async (req, res, next) => {
        let userLatitude = req.query.userLatitude;
        let userLongitude = req.query.userLongitude;

        let findings = await Finding
            .find({})
            .populate('ingredient', '_id name description')
            .populate('user', '_id username');

        if (userLatitude && userLongitude) {
            findings = self.filterFindingsByDistance(findings, userLatitude, userLongitude, 1);
        }

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
        let data = req.body;
        const newFinding = new Finding({
            latitude: data.latitude,
            longitude: data.longitude,
            user: data.user,
            ingredient: data.ingredient            
        });
        
        console.log("The new finding: " + newFinding);        
        await newFinding.save();
        newFinding.user = null;         // Ruben: Temporary solution
        newFinding.ingredient = null;   // Ruben: Temporary solution
        res.status(201).json(newFinding);        
    },

    updateFinding: async (req, res, next) => {
        const finding = req.body;
        const findingID = req.params.id;

        if (!findingID) {
            const err = new Error(`The ID of the requested finding is missing`);
            err.status = 400;
            return next(err);
        }

        if (!finding) {
            const err = new Error(`The finding is not supplied`);
            err.status = 400;
            return next(err);
        }

        if (finding._id !== findingID) {
            const err = new Error(`The finding IDs are different: ${finding._id} and ${findingID}`);
            err.status = 400;
            return next(err);
        }

        Finding.findOneAndUpdate({ _id: findingID }, finding, (err, updatedFinding) => {
            if (err) {
                return next(err);
            }

            if (!updatedFinding) {
                const err = new Error('The finding does not exist');
                err.status = 404;
                return next(err);
            }

            console.log("The updated finding: " + updatedFinding); 
            updatedFinding.user = null;         // Ruben: Temporary solution
            updatedFinding.ingredient = null;   // Ruben: Temporary solution
            return res.status(200).json(updatedFinding);
        });
    },

    deleteFinding: async (req, res, next) => {
        let findingId = req.params.id;

        if (!findingId) {
            const err = new Error(`The ID of the requested finding is missing`);
            err.status = 400;
            return next(err);
        }

        await Finding.findOneAndDelete({ _id: findingId }, (err) => {
            if (err) {
                return next(err);
            }           

            return res.status(204).json();
        });
    },

    filterFindingsByDistance: (findings, latitude, longitude, inRadius) => {
        let filtered = findings.filter(x => {
            let distance = self.getDistanceFromLatLonInKm(
                latitude,
                longitude,
                x.latitude,
                x.longitude
            );

            return distance < inRadius;
        });

        return filtered;
    },

    getDistanceFromLatLonInKm: (lat1, lon1, lat2, lon2) => {
        let p = 0.017453292519943295;    // Math.PI / 180
        let c = Math.cos;
        let a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p)) / 2;

        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    },

};