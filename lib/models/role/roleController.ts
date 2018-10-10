import roleService from "./services/roleService";
import loggers from "../../tools/loggers";
class TaskController {
    public async getAllRoles(req, res) {
        const result = await roleService.getAllRoles();
        res.status(200).send(result);
        global.logger.info(result);
    }

    public async getOneRole(req, res, next) {
        const roleId = parseInt(req.params.roleId, 10);
        const role = await roleService.getOneRole(roleId);
        if (role) {
            res.status(200).send(role);
        } else {
            res.sendStatus(404);
        }
    }

    public async deleteRole(req, res) {
        const roleId = parseInt(req.params.roleId, 10);
        const result = await roleService.deleteRoleById(roleId);
        result ? res.sendStatus(204) : res.sendStatus(404);
    }

    public async createNewRole(req, res) {
        const role = req.body;
        const result = await roleService.createRole(role);
        global.logger.info(`Create role: ${role}`);
        res.status(201).send(result);

    }

    public async updateRole(req, res) {
        const roleId = parseInt(req.params.roleId, 10);
        const role = req.body;
        const result = await roleService.updateRole(roleId, role);
        global.logger.info(`Update role: ${role}`);
        res.status(200).send(result);
    }
}

export default new TaskController();
