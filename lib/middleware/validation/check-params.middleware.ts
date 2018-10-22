import * as joi from "joi";

import RequestVerb from "../../server/enums/request-verb-enum";

export default class CheckParamsMiddleware {
  public static getCollectionName(req) {
    switch (req.method) {
      case RequestVerb.GET.name:
        return "query";
      case RequestVerb.POST.name:
      case RequestVerb.PATCH.name:
      case RequestVerb.PUT.name:
      case RequestVerb.DELETE.name:
        return "body";
    }
  }

  public static validateParamsJoi(schema: any) {
    return (req, res, next) => {
      const collectionName = CheckParamsMiddleware.getCollectionName(req);
      const result = joi.validate(req[collectionName], schema);
      if (!result.error) {
        next();
      } else {
        res.status(400).send(result.error);
      }
    };
  }

  // public static validateSequelizeEntity(entity) {
  //   return async (req, res, next) => {
  //     const collectionName = CheckParamsMiddleware.getCollectionName(req);
  //     const model = entity.build(req[collectionName]);
  //     try {
  //       await model.validate();
  //       next();
  //     } catch (error) {
  //       res.status(400).send(error);
  //     }
  //   };
  // }
}
