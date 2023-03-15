const express = require ('express');
const passport = require ('passport');
const sessionRouter = express.Router();

sessionRouter.get ('/github', passport.authenticate ('github', {scope: ['user:email']}), async (req, res) => {});

sessionRouter.get ('/githubcallback', passport.authenticate ('github', {failureRedirect: '/login'}), async (req, res) => {
    req.session.user = req.user;
    res.redirect ('/profile');
});

module.exports = {
    sessionRouter,
}