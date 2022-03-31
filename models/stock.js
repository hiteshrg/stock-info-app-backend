const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    high52Weeks: {
        type: Number,
        required: true
    },
    low52Weeks: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true,
    }
);

const StockDetails = new mongoose.model('stock', stockSchema);
module.exports = StockDetails;