const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let findingSchema = new Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Finding', findingSchema);