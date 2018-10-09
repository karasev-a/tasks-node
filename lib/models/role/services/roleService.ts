import { Role, IRoleAttributes } from "../role";

class TaskService {

    public async getAllRoles() {
        return Role.findAll();
    }

    public async getOneRole(roleId: number) {
        return Role.findOne({
            where: {
                id: roleId,
            },
        });
    }

    public async deleteRoleById(roleId: number) {
        return  Number.isInteger(roleId)
        ? Role.destroy({
            where: {
                id: roleId,
            },
        })
        : null;
    }

    public async updateRole(roleId: number, role: IRoleAttributes) {
        if (role && Number.isInteger(roleId)) {
            delete role.id;
            const result = await Role.update(role, {
                where: {
                    id: roleId,
                },
            });
            return result;
        }
    }

    public async createRole(role: IRoleAttributes) {
        if (role) {
            return Role.create(role);
        }
    }

}
export default new TaskService();
