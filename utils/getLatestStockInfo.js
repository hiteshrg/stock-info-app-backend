var stockModel = require('../models/stock');
const { quote } = require('yahoo-finance');

async function getYahooData() {
    const stockList = await stockModel.find({});

    for (let stock of stockList) {
        const result = await quote(stock.code, ['price', 'summaryDetail']);
        stock.currentPrice = result.price.regularMarketPrice,
            stock.low52Weeks = result.summaryDetail.fiftyTwoWeekLow,
            stock.high52Weeks = result.summaryDetail.fiftyTwoWeekHigh,
            await stock.save()
    }
}

setInterval(getYahooData, 300000);