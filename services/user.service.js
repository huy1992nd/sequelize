
const User = require('../models').User;
class userService {
    addUser(User) {
        User.Create(User)
        .then(user=>{
                console.log("user was save");
        })
        .catch(err=>{
            console.log(err);
        });
    }

    deleteUser(id) {
        User.delete(User)
        .then(user=>{
            console.log("user was delete");
        })
        .catch(err=>{
            console.log(err);
        });
    }
}

module.exports = new userService();