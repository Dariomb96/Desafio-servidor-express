import passport from 'passport';

const githubAuth = passport.authenticate('github', { scope: ['user:email'] });

const githubAuthCallback = async (req, res) => {
    try {
        req.session.user = req.user;
        res.redirect('/profile');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { 
    githubAuth,
    githubAuthCallback
};