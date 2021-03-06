const jwt = require('jwt-simple');
const User = require('../models/user');
const { secret, emailWhiteList } = require('../config');

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}

exports.signUp = (req, res, next) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    const errorArr = [];

    if(!email){
        errorArr.push('No email found');
    }

    if(!password){
        errorArr.push('No password found');
    }

    if(!emailRegex.test(email)){
        errorArr.push('Invalid email');
    }

    if(!passwordRegex.test(password)){
        errorArr.push('Invalid password. Must contain lowercase letter, uppercase letter, number, symbol, and be at least 8 characters long.');
    }

    if(emailWhiteList.indexOf(email) < 0){
        errorArr.push('Email is not white listed');
    }

    if(errorArr.length){
        return res.status(422).send({ success: false, errors: errorArr });
    }

    User.findOne({ email: email }, function(err, existingUser){
        if(err) return next(err);

        if(existingUser) return res.status(422).send({ errors: ['Email already in use']});

        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err){
            if(err) return next(err);

            res.json({ token: tokenForUser(user) });
        });
    });
}

exports.signIn = function(req, res, next){
    res.send({ token: tokenForUser(req.user) });
}

exports.verifyToken = function(req, res, next){
    if(req.user.expired) return res.send(req.user);
    next();
}
