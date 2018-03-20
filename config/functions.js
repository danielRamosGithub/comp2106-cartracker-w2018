/* Global Functions */

// Method to check if the user is logged into the system
module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
        return next();
        } else {
        res.redirect('/login');
        }
    }
};

