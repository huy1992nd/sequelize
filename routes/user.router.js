var express = require('express');
const UserController = require('../controllers/userController');
class userRouter {
    constructor() {
        this.router = express.Router();
        this.initRouter();
    }

    initRouter() {
        // app.route('/list_my_group')
        // .post((a,b)=>groupController.ListMyGroup(a,b));
        this.router.post('/add', (req, res, next) => UserController.addUser(req, res, next));
        this.router.put('', (req, res, next) => UserController.updateUser(req, res, next));
        this.router.delete('', (req, res, next) => UserController.deleteUser(req, res, next));
        this.router.get('/:id', (req, res, next) => UserController.getListUser(req, res, next));
    }
}

module.exports = new userRouter().router;
