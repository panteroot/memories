import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = ({_id}) => {
    return jwt.sign({id: _id}, process.env.SECRET_TOKEN, { expiresIn: '1d' });
}

export const userSignup = async(req, res) => {
    try {
        const { firstname, lastname, email, password, confirmPassword } = req.body;

        const user = await User.signup(firstname, lastname, email, password, confirmPassword);

        const token = createToken(user._id);

        res.status(200).json({ status: 200, data: user, token });

    } catch (e) {
        res.status(400).json({ status: 400, error: e.message });
    }
}

export const userLogin = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({ status: 200, data: user, token });

    } catch (e) {
        res.status(400).json({ status: 400, error: e.message });
    }
}