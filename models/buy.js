const mongoose = require('mongoose');

const buySchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
});

const BuyStock = new mongoose.model('buy', buySchema);
module.exports = BuyStock;