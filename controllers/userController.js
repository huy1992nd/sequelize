const userService = require('../services/user.service');
const message = require('../define').message;
const LIMIT_DEFAULT = 100;
const OFFSET_DEFAULT = 0;
var validator = require('validator');

class UserController {
    constructor() {
    }

    async addUser(req, res, next) {
        let body = req.body;
        let validateInput = await this.validateInput(body, 1);
        if (!validateInput.status) {
            res.json({ code: 1, message: validateInput.error_message });
            return;
        }

        let add_user = await userService.addUser(body);
        if (add_user) {
            res.json({ code: 0, message: message.ADD_USER_SUCCESS });
        } else {
            res.json({ code: 1, message: message.ERROR });
        }
    }

    async updateUser(req, res, next) {
        let body = req.body;
        console.log('body', body);

        if (!body.id || typeof(body.id) == "undefined") {
            res.json({ code: 1, message: message.INCORRECT_DATA });
            return;
        }
        let validateInput = await this.validateInput(body, 1);
        if (!validateInput.status) {
            res.json({ code: 1, message: validateInput.error_message });
            return;
        }
        let update_user = userService.updateUser(body);
        if (update_user) {
            res.json({ code: 0, message: message.EDIT_USER_SUCCESS });
        } else {
            res.json({ code: 1, message: message.ERROR });
        }
    }

    async deleteUser(req, res, next) {
        let body = req.body;
        if (!body.id || typeof(body.id) == "undefined") {
            res.json({ code: 1, message: message.INCORRECT_DATA });
            return;
        }
        let delete_user = await userService.deleteUser(body.id);
        if (delete_user) {
            res.json({ code: 0, message: message.DELETE_USER_SUCCESS });
        } else {
            res.json({ code: 1, message: message.ERROR });
        }
    }

    async getListUser(req, res, next) {
        let query = req.query;
        let str_search = query.search || "";

        let limit = query.limit ? parseInt(query.limit) : LIMIT_DEFAULT;
        let offset = query.offset ? parseInt(query.offset) : OFFSET_DEFAULT;
        let list_user = await userService.listUser(str_search, limit, offset);
        if (list_user) {
            res.json({ code: 0, list_user: list_user });
        } else {
            res.json({ code: 1, message: message.ERROR });
        }
    }

    async validateInput(data) {
        let { name, age, sex, phone, birth_day, id } = data;
        console.log('name, age, sex, phone, birth_day, id', name, age, sex, phone, birth_day, id);
        let list_error_message = [];
        if (!name || !age || !sex || !phone || !birth_day ||
            typeof(name) == "undefined" ||
            typeof(age) == "undefined" ||
            typeof(sex) == "undefined" ||
            typeof(phone) == "undefined" ||
            typeof(birth_day) == "undefined"
        ) {
            list_error_message.push(message.DATA_INCORRECT);
        } else {
            if (parseInt(age) < 0 || parseInt(age) > 200) {
                list_error_message.push(message.SEX_WRONG);
            }
            if (!["1", "2"].includes(sex)) {
                list_error_message.push(message.BIRTH_DAY_WRONG);
            }
            let regex_birth_day = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
            if (!regex_birth_day.test(birth_day)) {
                list_error_message.push(message.BIRTH_DAY_WRONG);
            }
            let regex_phone = /[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}/
            if (!regex_phone.test(phone)) {
                list_error_message.push(message.PHONE_WRONG);
            }
        }

        // check dublicate name
        let is_duplicate = await userService.checkDuplicate(name, id);
        if (is_duplicate) {
            list_error_message.push(message.NAME_DUPLICATE);
        }

        return {
            status: list_error_message.length ? false : true,
            error_message: list_error_message.join("/n")
        }
    }
}

module.exports = new UserController();
