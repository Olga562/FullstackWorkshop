const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    title: {type: String, required: true },
    artist: {type: String, required: true},
    year: {type: Number, required: true},
});

module.exports = mongoose.model('music', musicSchema);