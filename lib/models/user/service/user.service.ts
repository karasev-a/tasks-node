import { User, IUserAttributes } from "../user";
import * as jwt from "jsonwebtoken";

class UserService {

    // all
    public async getAll() {
        return User.findAll();
    }

    // by id
    public async getById(UserId) {
        return Number.isInteger(UserId)
            ? User.findOne({
                where: {
                    id: UserId,
                },
            })
            : null;
    }

    // delete
    public async delete(userId) {
        return Number.isInteger(userId)
            ? User.destroy({
                where: {
                    id: userId,
                },
            })
            : null;
    }

    // Post
    public async create(model) {
        if (model) {
            if (!model.id) {
                return User.create(model);
            }
            throw new Error("User already exists");
        }
    }

    // Put
    public async update(userId, model) {
        if (model && Number.isInteger(userId)) {
            delete model[userId];
            const result = await User.update(model, { where: { id: userId } });
            return !!result[0];
        }
    }

    // check email and password
    public async checkCredentials(credentials) {
        const email = credentials.email;
        const password = credentials.password;
        const UserExists = (await User.findOne({
            where: {
                email,
            },
        })) as IUserAttributes;

        if (UserExists) {
            if (UserExists.password === password) {
                return UserExists;
            } else {
                // wrong password try again
                // or reset you password
                return false;
            }
        } else {
            // doesn't exists
        }
    }

    // provide token wit id and roleId
    public async auth(user) {
        return jwt.sign({
            userId: user.userId,
            roleId: user.roleId,
        }, "secret", { expiresIn: "1h" }); // #TODO: add real secreat key

        // redirect to tasks page
        // who should ask api for tasklist?
    }

    // check token
    public async isAuth(token) {
        try {
            return jwt.verify(token, "secret");
        } catch (err) {
            // return false;
        }
    }
}

export default new UserService();
