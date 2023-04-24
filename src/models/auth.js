const { Schema, model }  = require('mongoose');
const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const Item = require('./item');

const userSchema = new Schema({
    email: { 
        type: String, 
        unique: true,
        required: true, 
        trim: true,
        lowercase: true,
        validate(value) {
            const pattren = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (!pattren.test(value)) {
                throw new Error('Invalid email')
            }
        }
    },
    name: { type: String, required: true, trim: true },
    age: { type: Number, default: null },
    password: { 
        type: String, 
        required: true, 
        minlength: 6, 
        trim: true
    },
    usertype: { type: String, default: 'user', required: true },
    tokens: [{ type: String, required: true }]
}, { timestamps: true });

userSchema.virtual('items', { ref: 'Item', localField: '_id', foreignField: 'owner' });


// middleware methods------------->

// Hide data from profile
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password
    delete userObject.tokens
    return userObject;
};

//  for jwt token 
userSchema.methods.generateAuthToken = async function () {
    const token = sign(
        { id: this._id.toString() }, 
        process.env.SECRET, 
        { expiresIn: '7 days' }
    );
    this.tokens = this.tokens.concat(token);
    await this.save();
    return token;
}

// for user login
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error();
    };
    const isMatch = await compare(password, user.password);
    if (user && !isMatch) {
        throw new Error('Authenticaton Failed!');
    };
    return user;
};

// hash password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 8);
    }
    next();
});

// delete tasks of user who remove himself
userSchema.pre('remove', async function (next) {
    await Item.deleteMany({ owner: this._id });
    next();
});

const User = model('User', userSchema);
module.exports = User;