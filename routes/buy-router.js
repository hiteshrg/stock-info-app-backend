var express = require('express');
var router = express.Router();
const { create, get, getSingle, update, deleteShare } = require('../controllers/buyController')

router.post('/add', create);
router.get('/get', get);
router.get('/get/:id', getSingle);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteShare);

module.exports = router;