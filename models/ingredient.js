const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ingredientSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    findings: [{ type: Schema.Types.ObjectId, ref: 'Finding' }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);