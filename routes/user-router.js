const express = require('express');
const router = express.Router();
const { create, get } = require('../controllers/userController');

router.post("/add", create);
router.get("/get", get);

module.exports = router;