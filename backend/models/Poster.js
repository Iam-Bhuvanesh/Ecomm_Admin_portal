const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Poster = mongoose.model('Poster', posterSchema);

module.exports = Poster;
