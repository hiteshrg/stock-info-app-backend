const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * 
 * @method POST
 * User Sign in
 */
exports.signin = async (req, res) => {
    try {
        let token, loginToken;
        const { email, password } = req.body;
        if (!email || !password) { res.status(400).json({ message: 'required fields' }) }

        const isUser = await db.userModel.findOne({ email: email });

        // console.log('isUser', isUser);
        if (isUser) {
            const isMatch = await bcrypt.compare(password, isUser.password);
            token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
            loginToken = await db.loginHistory.create({
                authKey: token,
                userId: isUser._id
            })
            // token = await isUser.generateToken();
            // console.log('token', token, "\nisMatch", isMatch, "\nuserId", isUser._id, "\nloginToken", loginToken);
            if (!isMatch) {
                res.status(404).json({ message: 'Invalid Credentials' })
            } else {
                let { authKey } = loginToken;
                console.log('LoginToken :', loginToken)
                let { fname, lname, email, phone, _id } = isUser;
                res.cookie("jwtoken", { fname, lname, email, phone, loginToken }, { expires: new Date(Date.now() + 172800), httpOnly: true })
                res.status(200).json({ status: "success", message: 'Sign In Successful', data: { fname, lname, email, phone, authKey, userId: _id } });
            }
        } else {
            res.status(404).json({ message: 'Invalid Credentials' })
        }

    } catch (err) {
        console.error('Error :', err)
        res.status(500).json(err);
    }
}

/**
 * 
 * @method POST
 * Create Token
 */
exports.create = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err)
    }
}

/**
 * 
 * @method Get
 * get all Token
 */
exports.getAllToken = async (req, res) => {
    try {
        const data = await db.loginHistory.find({});
        res.status(200).json({ data: data });
    } catch (err) {
        res.status(500).json(err)
    }
}

/**
 * 
 * @method GET
 * get single Token
 */
exports.getSingle = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await db.loginHistory.findById({ _id });
        res.status(200).json({ data: data });
    } catch (err) {
        res.status(500).json(err)
    }
}

/**
 * 
 * @method PUT
 * update Token
 */
exports.update = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err)
    }
}

/**
 * 
 * @method DELETE
 * delete Token
 */
exports.delete = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err)
    }
}