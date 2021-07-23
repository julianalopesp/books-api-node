const { Schema, model } = require('mongoose');

const BookSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    publishDate: {
        type: Date,
    },
    pageCount: {
        type: Number,
    },
    createdAt: {
        type: Date, 
        required: true,
        default: Date.now
    },
    Image: {
        type: String,
    },
    author: {
        type: String,

    }
});

module.exports = model('Book', BookSchema);