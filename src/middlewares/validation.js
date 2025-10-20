const validator = require("validator")

const signupValidator = async (req, res, next) => {
    
    try {
        const { username, email, password } = req.body
        if (!username) {
            throw new Error("user name is required");
        } else if (username.length < 4) {
            throw new Error("user name should be minimum 4 characters");
        } else if (!validator.isEmail(email)) {
            throw new Error("Enter an valid email id")
        } else if (!validator.isStrongPassword(password)) {
            throw new Error("Enter an strong password")
        }
        next()
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}




module.exports = { signupValidator }