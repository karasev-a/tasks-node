import User from "../user";

class UserService {

    // all
    public async getAll(options) {
        return User.findAll(options); // include: [{ all: true }] ?
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
            const result = await User.update(model, {where: {id: userId}});
            return !!result[0];
        }
    }
}

export default new UserService();
