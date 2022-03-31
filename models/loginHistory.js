const mongoose = require('mongoose');

const LoginHistorySchema = mongoose.Schema({
    authKey: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        default: 'active',
        required: true,
    }
},
    {
        timestamps: true
    }
)

const LoginHistory = new mongoose.model('loginhistory', LoginHistorySchema);
module.exports = LoginHistory;