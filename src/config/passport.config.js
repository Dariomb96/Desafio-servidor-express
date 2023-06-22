import passport from "passport";
import githubStrategy from "passport-github2";
import { userModel } from "../dao/models/users.js";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
dotenv.config();

const intializePassport = () => {

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    });

    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([
            (req) => {
                let token = null;
                if (req && req.cookies) {
                    token = req.cookies[process.env.JWT_COOKIE_NAME];
                }
                return token;
            },
        ]),
        secretOrKey: process.env.JWT_SECRET,
    }, async (jwtPayload, done) => {
        try {
            const user = await userModel.findById(jwtPayload.id);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    }));

    passport.use('github', new githubStrategy({
        clientID: "Iv1.3c46c1a4af96e104",
        clientSecret: '31a758e1391f78f174129fd0238abed916dbd81d',
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await userModel.findOne({ email: profile._json.email });
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email: profile._json.email,
                    password: ''
                }
                let result = await userModel.create(newUser);
                done(null, result);
            }
            else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));
}
export {
    intializePassport,
}