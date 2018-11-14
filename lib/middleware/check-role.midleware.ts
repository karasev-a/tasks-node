import loggers from "../tools/loggers";

export const permit = (...allowed) => {
    const isAllowed = (role) => allowed.indexOf(role) > -1;

    return (req, res, next) => {
        if (isAllowed(req.roleId)) {
            next();
        } else {
            global.logger.info(`User doesn't have permission.`);
            res.status(403).send("You doesn't have permission.").end();
        }
    };
};
