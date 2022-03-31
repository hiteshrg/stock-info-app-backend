const db = require('../models');

/**
 * 
 * @method POST
 * Create User Data
 */
exports.create = async (req, res) => {

    const { fname, lname, email, phone, password, cpassword } = req.body;

    if (!fname || !lname || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ error: 'required fields' });
    }

    try {

        const userExist = await db.userModel.findOne({ email: email });

        if (userExist) {
            return res.status(200).json({ error: 'Email already exists', code: 422 });
        } else if (password !== cpassword) {
            return res.status(200).json({ error: 'Password are not matching', code: 422 });
        } else {
            const data = new db.userModel(req.body);
            const response = await data.save();
            res.status(201).json({ response: "success", message: "User registered successfully", data: response, code: 201 })
        }

    } catch (err) {
        res.status(500).json(err)
    }
}

/**
 * 
 * @method GET
 * Get All User Data
 */
exports.get = async (req, res) => {
    try {
        const data = await db.userModel.find({});
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json(err);

    }
}