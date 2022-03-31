var express = require('express');
var router = express.Router();
const { createStock, getStocks, getSingleStocks, updateStocks, deleteStock, getYahooData, getAllPurchasedStockDetails } = require('./../controllers/stockController');

/* GET users listing. */
router.post('/add', createStock);
router.post('/get-yahoo-data', getYahooData);
router.get('/get-all-purchased-stock', getAllPurchasedStockDetails);
router.get('/get', getStocks);
router.get('/get/:id', getSingleStocks);
router.put('/update/:id', updateStocks);
router.delete('/delete/:id', deleteStock);

module.exports = router;
