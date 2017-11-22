const passport = require('passport');
const User = require('../models/user');
const { secret, tokenExpireLength } = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    email = email.toLowerCase();
    User.findOne({ email: email }, function(err, user){
        if(err) return done(err);
        if(!user) return done(null, false);

        user.comparePassword(password, function(err, isMatch){
            if(err) return done(err);
            if(!isMatch) return done(null, false);

            return done(null, user);
        });
    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    const now = new Date().getTime();

    if(payload.iat + tokenExpireLength < now){
        return done(null, {expired: true, msg: 'Token has expired. Please sign back in.'});
    }

    User.findById(payload.sub, function(err, user){
        if(err) return done(err, false);

        return user ? done(null, user) : done(null, false);
    });
});

passport.use(jwtLogin);
passport.use(localLogin);
