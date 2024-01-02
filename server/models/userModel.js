import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    firstname: String,
    lastname: String
}, { timestamps: true });

userSchema.statics.signup = async function(firstname, lastname, email, password, confirmPassword) {
    try {
        if(!email || !password)
            throw Error('Pls fill in all fields!');

        if(password !== confirmPassword)
            throw Error('Confirm password not the same!');

        if(!validator.isEmail(email))
            throw Error('Pls input valid email!');

        if(!validator.isStrongPassword(password))
            throw Error('Pls input strong password!');

        const userExists = await this.findOne({email});

        if(userExists)
            throw Error('Email already taken!');

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await this.create({ firstname, lastname, email, password: hash });

        return user;
        
    } catch (e) {
        throw Error(e.message);
    }
}

userSchema.statics.login = async function(email, password) {
    try {
        if(!email || !password)
            throw Error('Pls fill in all fields!');

        const user = await this.findOne({email});

        if(!user)
            throw Error('Incorrect email!');

        const match = await bcrypt.compare(password, user.password);

        if(!match)
            throw Error('Incorrect password!');

        return user;
        
    } catch (e) {
        throw Error(e.message);
    }
}

const model = mongoose.model('User', userSchema);


export default model;