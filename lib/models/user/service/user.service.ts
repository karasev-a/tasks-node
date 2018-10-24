import { User, IUserAttributes } from "../user";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { OrngError } from "../../../tools/error";
import { Role } from "../../role/role";

class UserService {

    // all
    public async getAll() {
        return User.findAll({
            include: [{
                model: Role,
            }],
        });
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
                model.password = this.bcryptPassword(model.password);
                return User.create(model);
            }
            throw new OrngError("User already exists", 401);
        }
    }

    // Put
    public async update(userId, model) {
        if (model && Number.isInteger(userId)) {
            // #TODO: add bcrypt before update password;
            delete model[userId];
            const result = await User.update(model, { where: { id: userId } });
            return !!result[0];
        }
    }

    // check email and password
    public async checkCredentials(credentials) {
        if (!credentials.email) {
            throw new OrngError("empty mail field", 400);
        }
        if (!credentials.password) {
            throw new OrngError("empty password", 401);
        }

        const email = credentials.email;
        const password = credentials.password;

        const UserExists = (await User.findOne({
            where: {
                email,
            },
        })) as IUserAttributes;

        if (UserExists) {
            if (this.isSamePassword(password, UserExists.password)) {
                return UserExists;
            } else {
                // wrong password try again
                // or reset you password
                throw new OrngError("wrong password", 401);
            }
        } else {
            // doesn't exists
            throw new OrngError("user with this email doesn't exists", 400);
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
    public isAuth(token) {
        let result;
        jwt.verify(token, "secret", (err, decoded) => {
            err ? result = false : result = true;
        });
        return result;
        // try {
        //     const tk = jwt.verify(token, "secret");
        //     return jwt.verify(token, "secret");
        // } catch (err) {
        //     return false;
        // }
    }

    // before create bcrypt password
    private bcryptPassword(password) {
        const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|"
            + "((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if (!mediumRegex.test(password)) {
            throw new OrngError("wrong password"); // #TODO: you can add more detail errors like too short, etc.
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    // compare password
    private isSamePassword(password, hash) {
        return bcrypt.compareSync(password, hash); // true
    }

}

export default new UserService();
