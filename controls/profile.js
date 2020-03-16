const User = require('../controls/userSchema');

function profilePage(req, res) {
    if (!req.session.user) {
        res.redirect('/login');
        return
    }
    User.findOne({_id : req.params.id}, (err, profile) => {
        if (err) {
            throw(err);
        } else {
            res.render('profile', {data: profile, user: req.session.user, id: req.session.user._id})
        }
    });
}


function userProfile(req, res) {
    if (!req.session.user) {
        res.redirect('/login');
        return
    }
    User.findOne({_id : req.params.id}, (err, profile) => {
        let like = false;
        let match = false;
        if (err) {
            throw(err);
        } else {
            User.findOne({_id: req.session.user._id}, (err, userProfile) => {
                if (err) {
                    throw(err);
                } else {
                        for(let x = 0;x<userProfile.likes.length;x++){
                            if(userProfile.likes[x] == profile._id ){
                                like = true;
                                for(let i = 0;i<profile.likes.length;i++){
                                    if(profile.likes[i] == userProfile._id) {
                                        match = true;
                                    }
                                }
                            } else {
                                like = false;
                            }
                        }
                        console.log(like, match);
                    res.render('userprofile', {data: profile, user: userProfile, liked: like, match: match, id: req.session.user._id})
                }
            })
        }
    });
};

module.exports = {
    userProfile: userProfile, 
    profilePage: profilePage
};