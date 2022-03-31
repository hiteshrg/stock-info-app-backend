const express = require('express');
const router = express.Router();
const { signin, getAllToken, getSingle } = require('../controllers/authController');

router.post("/signin", signin);
router.get('/get-tokens', getAllToken);
router.get('/get-token/:id', getSingle);

module.exports = router;