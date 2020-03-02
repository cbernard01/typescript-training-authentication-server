import "reflect-metadata";
import {AppRouter} from "../../AppRouter";
import {MetadataKeys, Methods} from "./MetadataEnums";
import {NextFunction, RequestHandler, Response} from "express";
import {RequestWithBody} from "../../interfaces/routeInterfaces";
import {loginErrorMessage, loginFormView} from "../../views/viewData";

function bodyValidators(keys: string[]): RequestHandler {
  return function (request: RequestWithBody, response: Response, next: NextFunction): void {
    if (!request.body) {
      response.status(422).send(loginErrorMessage + loginFormView);
      return;
    }

    for (let key of keys) {
      if (!request.body[key]) {
        response.status(422).send(loginErrorMessage + loginFormView);
        return;
      }
    }

    next();
  }
}

export function Controller(routePrefix: string): Function {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const method: Methods = Reflect.getMetadata(MetadataKeys.Method, target.prototype, key);
      const path = Reflect.getMetadata(MetadataKeys.Path, target.prototype, key);
      const middlewares = Reflect.getMetadata(MetadataKeys.Middleware, target.prototype, key) || [];
      const requiredBodyProps = Reflect.getMetadata(MetadataKeys.Validator, target.prototype, key) || [];

      const validator = bodyValidators(requiredBodyProps);

      if (path && method) router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
    }
  };
}
