const db = require('./../models');
const axios = require('axios');

/**
 * purchase stock
 * @method POST
 * @param stockName
 */
exports.create = async (req, res) => {
    try {

        // check if stock exist in stock table
        // if not, get data from yahoo and insert in stock table
        const code = req.body.code;
        // console.log('Herry :', req.body.code)
        const stockDb = await db.stockModel.findOne({ code: code })
        if (stockDb) {
            console.log('Found stock')
        } else {
            console.log('Not Found stock')
            try {
                const newStock = await axios({ method: 'POST', url: 'http://localhost:8080/stock/get-yahoo-data', data: { 'symbol': [code] } });
                const data = new db.stockModel({
                    code: code,
                    company: newStock.data[0].fullName,
                    currentPrice: newStock.data[0].currentPrice,
                    high52Weeks: newStock.data[0].high52Weeks,
                    low52Weeks: newStock.data[0].low52Weeks,
                });
                await data.save();
            } catch (err) {
                console.log('Error :', err)
            }
        }

        const data = new db.buyModel(req.body);
        const response = await data.save();
        res.json({
            status: 'success',
            data: response
        });

    } catch (err) {
        console.error('catch error in backend', err);
        res.status(500).json(err)
    }
}

/**
 * GET all puchase data
 * @method GET
 * @param stockName
 */
exports.get = async (req, res) => {
    try {
        const response = await db.buyModel.find({}).sort({ quantity: -1 })
        const total = await db.buyModel.count();
        // console.log('Response :', response)
        res.status(200).json({ total: total, data: response });
    } catch (err) {
        res.status(500).json(err)
    }
}

/**
 * GET single puchase data
 * @method GET
 * @param stockName
 */
exports.getSingle = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await db.buyModel.findById(_id);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json(err);
    }
}


/**
 * Update puchase data
 * @method PUT
 * @param stockName
 */
exports.update = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await db.buyModel.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err)
    }
}


exports.deleteShare = async (req, res) => {
    try {
        const data = await db.buyModel.findByIdAndDelete(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}