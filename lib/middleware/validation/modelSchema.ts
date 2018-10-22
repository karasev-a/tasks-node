import * as joi from "joi";

export const taskSchema  = joi.object().keys({
    title: joi.string().required(),
    people: joi.number().integer().min(1).max(5),
    price: joi.number().positive(),
    description: joi.string().min(5).max(255),
    date: joi.date().min("now"),
    subscrebedPeople: joi.number().integer().max(joi.ref("people")),
    status: joi.number().integer().min(1),
    userId: joi.number().integer(),
    categoryId: joi.number().integer(),
});
