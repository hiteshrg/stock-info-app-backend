const mongoose = require('mongoose');

const sellSchema = mongoose.Schema({
    data: {
        type: Date,
        required: true,
    },
    userId: {
        type: String,
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
},
    {
        timestamps: true,
    }
);

const SellStock = new mongoose.model('sell', sellSchema);
module.exports = SellStock;