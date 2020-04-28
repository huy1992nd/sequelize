const userService = require('../services/user.service');

class UserController {
    constructor() {
    }

    addUser(req, res, next){
        console.log('api add User', req.body);
        userService.addUser(req.body);
        res.json({});
    }

    updateUser(req, res, next){
        console.log('api update User', req.body);
    }

    deleteUser(req, res, next){
        console.log('api add User', req.body);
        userService.deleteUser(req.body.id);
        res.json({});
    }

    getListUser(req, res, next){
        console.log('api get User', req.body);
    }
}

module.exports = new UserController();
