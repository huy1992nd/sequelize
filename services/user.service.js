
const User = require('../models').User;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class userService {

    addUser(input) {
        return new Promise((resolve, reject) => {
            let user_create = {
                name: input.name,
                age: input.age,
                sex: input.sex,
                birth_day: input.birth_day,
                phone: input.phone,
            }
            User.create(user_create)
                .then(user => {
                    resolve(user)
                })
                .catch(err => {
                    reject(err)
                });
        })
    }

    updateUser(input) {
        return new Promise((resolve, reject) => {
            let id = input.id;
            let data_update = {
                name: input.name,
                age: input.age,
                sex: input.sex,
                birth_day: input.birth_day,
                phone: input.phone,
            }
            User.update(
                data_update,
                { where: { id } }
            )
                .then(result =>
                    resolve(true)
                )
                .catch(err =>
                    reject(err)
                )
        })
    }

    deleteUser(id) {
        return new Promise((resolve, reject) => {
            User.update(
                { deleted: 1 },
                { where: { id } }
            )
                .then(result =>
                    resolve(true)
                )
                .catch(err =>
                    reject(err)
                )
        })
    }

    listUser(str_search, limit, offset) {
        return new Promise((resolve, reject) => {
            let options = {
                where: {
                    deleted: 0
                }
            };
            if (str_search) {
                options = {
                    offset: offset,
                    limit: limit,
                    order: [
                        ['name', 'DESC']
                    ],
                    where: {
                        deleted: 0,
                        name: {
                            [Op.like]: `%${str_search}%`
                        }
                    }
                };
            }
            User.findAll(options)
                .then(result => {
                    resolve(result)
                }
                )
                .catch(err => {
                    console.log('err', err);
                    reject(err)
                }
                );
        })
    }

    checkDuplicate(name, id = null) {
        return new Promise((resolve, reject) => {
            let where = {
                name: name,
                deleted: 0
            }
            if (0 && id) {
                where["id"] = {
                    [Op.notIn]: [id]
                }
            }
            User.findOne({
                where: where
            })
                .then(result => {
                    if (result) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        })
    }
}

module.exports = new userService();