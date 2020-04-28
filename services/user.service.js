
const User = require('../models').User;
class userService {
    addUser(user) {
        User.create(user)
        .then(user=>{
                console.log("user was save");
        })
        .catch(err=>{
            console.log(err);
        });
    }

    deleteUser(id) {
        User.destroy({ where: { id } })
        .then(function (user) {
           console.log('user was delete');
        }).catch(ex => {
          console.log(ex);
        });
    }
}

module.exports = new userService();