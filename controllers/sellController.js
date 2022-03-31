const db = require('../models');

/**
 * sell stock
 * @method POST
 * @param stockName
 */
exports.create = async (req, res) => {
    try {
        const data = new db.sellModel(req.body);
        const response = await data.save();
        res.status(201).json(response)
    } catch (err) {
        res.status(500).json(err)
    }
}

/**
 * GET all sell data
 * @method GET
 * @param stockName
 */
exports.get = async (req, res) => {
    try {
        const response = await db.sellModel.find({})
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json(err)
    }
}

/**
 * GET single sell data
 * @method GET
 * @param stockName
 */
exports.getSingle = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await db.sellModel.findById(_id);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json(err);
    }
}


/**
 * Update sell data
 * @method PUT
 * @param stockName
 */
exports.update = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await db.sellModel.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err)
    }
}


exports.deleteShare = async (req, res) => {
    try {
        const data = await db.sellModel.findByIdAndDelete(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}