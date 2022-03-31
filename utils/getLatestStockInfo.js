var db = require('../models/stock');
const { quote } = require('yahoo-finance');

async function getYahooData(req, res) {
    try {
        const result = await quote('TSLA', ['price', 'summaryDetail']);
        const data = new db.stockModel(req.body);
        console.log(result.data);
        res.json({
            status: 'success',
            currentPrice: result.price.regularMarketPrice,
            low52Weeks: result.summaryDetail.fiftyTwoWeekLow,
            high52Weeks: result.summaryDetail.fiftyTwoWeekHigh,
            fullName: result.price.longName,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'failed', error: err });
    }
}

var getData = setInterval(getYahooData, 60000);

exports.module = getData;