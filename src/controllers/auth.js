const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authConfig = require('../config/auth');
const mailer = require('../modules/mailer');

function generateToken (params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })};

module.exports = {

    register: async (req, res) => {
        const { email } = req.body;

        try {
            if (await User.findOne({ email }))
            return res.status(400).json({
                success: false,
                error: 'User already exists'
            });
            
            const user = await User.create(req.body);

            user.password = undefined;

            return res.send({
            user, 
            token: generateToken({ id: user.id })
        });
    } catch (err) {
        return res.status(400).json({
                success: false,
                error: 'Register failed'
            });
    }
    },

    authenticate: async(req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne ({ email }).select('+password');

        if(!user)
        return res.status(400).json({
                success: false,
                error: 'User not found'
            });

        if (!await bcrypt.compare(password, user.password))
        return res.status(400).json({
                success: false,
                error: 'Invalid password'
            });

        user.password = undefined;
        
        res.send({
            user, 
            token: generateToken({ id: user.id })
        });
    },

    forgotPassword: async(req, res) => {
        const { email } = req.body;

        try {
            const user = await User.findOne ({ email });

            if (!user)
            return res.status(400).json({
                success: false,
                error: 'User not found'
            });

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            });

            mailer.sendMail({
                to: email,
                from: 'julianalopespereira3@gmail.com',
                template: 'auth/forgot_password',
                context: { token },
            }, (err) => {
                if (err)
                return res.status(400).json({
                success: false,
                error: 'Cannot send forgot password email'
            });
            
            return res.send(); 
            
        });
        
        } catch (err) {
            return res.status(400).json({
                success: false,
                error: 'Error on forgot password, try again'
            });
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user)
        } catch {
            return res.status(400).json({
                success: false,
                error: 'Error'
            });
        }
    },

    resetPassword: async (req, res) => {
        const { email, token, password } = req.body;

        try {
            const user = await User.findOne({ email })
                .select('+passwordResetToken passwordResetExpires');

            if (!user)
                return res.status(400).json({
                success: false,
                error: 'User not found'
            });

            if (token !== user.passwordResetToken)
            return res.status(400).json({
                success: false,
                error: 'Token invalid'
            });

            const now = new Date();
            if (now > user.passwordResetExpires)
            return res.status(400).json({
                success: false,
                error: 'Token expired, generate a new one'
            });

            user.password = password;

            await user.save();

            res.send();

        } catch (err) {
            return res.status(400).json({
                success: false,
                error: 'Cannot reset password, try again'
            });
        }
    },
    
};