const db = require('./../models');
const { quote } = require('yahoo-finance');
const axios = require('axios');

/**
 * Create Stock
 * @method POST
 * @param stockName
 * @param  
 */
exports.createStock = async (req, res) => {
    try {
        const data = new db.stockModel(req.body);
        // console.log('Data :', req.body);
        const response = await data.save();
        res.status(201).json(response)
    } catch (err) {
        res.status(500).json(err);
    }
}

/**
 * GET all Stocks
 * @method GET
 * @param stockName
 * @param  
 */
exports.getStocks = async (req, res) => {

    try {

        const data = await db.stockModel.find({});
        res.status(200).json(data);

    } catch (err) {

        res.status(500).json(err);

    }

}

/**
 * get single Stock
 * @method GET
 * @param stockName
 * @param  
 */
exports.getSingleStocks = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await db.stockModel.findById(_id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.updateStocks = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await db.stockModel.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.deleteStock = async (req, res) => {
    try {
        const data = await db.stockModel.findByIdAndDelete(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

// -----------------------------------------------------------------------------------------------------------------

exports.getYahooData = async (req, res) => {
    try {
        let symbols = req.body.symbol;
        let stockData = [];
        for (let i = 0; i < symbols.length; i++) {
            const result = await quote(symbols[i], ['price', 'summaryDetail']);
            stockData.push({
                currentPrice: result.price.regularMarketPrice,
                low52Weeks: result.summaryDetail.fiftyTwoWeekLow,
                high52Weeks: result.summaryDetail.fiftyTwoWeekHigh,
                fullName: result.price.longName
            });
        }
        // const result = await quote({ symbols: req.body.symbol, fields: ['s', 'n', 'k', 'j'] });
        // console.log('result', result);
        /* res.json({
            status: 'success',
            currentPrice: result.price.regularMarketPrice,
            low52Weeks: result.summaryDetail.fiftyTwoWeekLow,
            high52Weeks: result.summaryDetail.fiftyTwoWeekHigh,
            fullName: result.price.longName,
        }); */
        res.json(stockData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'failed', error: err });
    }
}

exports.getAllPurchasedStockDetails = async (req, res) => {
    try {
        const data = await db.buyModel.find({}).where({ userId: req.body.userId });
        let uniqueStock = [];
        let formattedStock = [];

        for (let i = 0; i < data.length; i++) {
            if (uniqueStock.indexOf(data[i]['code']) < 0) {
                uniqueStock.push(data[i]['code']);
            }
        }

        // let yahooData;
        // await axios({ method: 'POST', url: "http://localhost:8080/stock/get-yahoo-data", data: { 'symbol': uniqueStock } })
        //     .then((res) => {
        //         yahooData = res.data;
        //     }).catch((err) => console.error(err));
        // console.log('uniqueStock :', uniqueStock)

        for (let i = 0; i < uniqueStock.length; i++) {
            let temp = data.filter((item) => item.code === uniqueStock[i]);
            // console.log('check :', temp.filter((item) => item.name === yahooData[i].fullName))
            if (temp.length) {
                let newObj = {
                    code: temp[0].code, name: temp[0].name, total: 0, quantity: 0, avg: 0, items: []
                };

                let tmpTotal = 0, tmpQuantity = 0;
                for (let j = 0; j < temp.length; j++) {
                    tmpTotal += temp[j]['total'];
                    tmpQuantity += temp[j]['quantity'];
                    newObj.items.push(temp[j]);
                }
                newObj.total = tmpTotal.toFixed(2);
                newObj.quantity = tmpQuantity;
                newObj.avg = newObj.total / newObj.quantity;
                formattedStock.push(newObj);
            }
        }



        res.json({ status: 'success', data: formattedStock });

    } catch (err) {
        res.status(500).json({ status: 'failed', error: err });
    }
}

// exports.getStocksByUserId = async (req, res) => {
//     try {
//         console.log(req.body)
//         const data = await db.buyModel.find({}).where({ userId: req.body.userId });
//         const count = await db.buyModel.find({}).count();
//         res.status(200).json({ totalRecord: count, data: data });
//     } catch (err) {
//         res.status(500).json(err);
//     }

// }