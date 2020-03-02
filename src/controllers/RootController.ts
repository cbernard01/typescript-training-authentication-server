import {RequestWithBody} from "../interfaces/routeInterfaces";
import {NextFunction, Response} from "express";
import {loggedInHomeView, loggedOutHomeView, protectedView, unprotectedView} from "../views/viewData";
import {Controller, Get, Use} from "./decorators";

function requireAuth(request: RequestWithBody, response: Response, next: NextFunction): void {
  if (request.session && request.session.loggedIn) {
    next();
    return;
  }
  response.status(403).send(unprotectedView + loggedOutHomeView);
  return;
}


@Controller("")
class RootController {
  @Get("/")
  getRoot(request: RequestWithBody, response: Response) {
    if (request.session && request.session.loggedIn) {
      response.status(200).send(loggedInHomeView);
    } else {
      response.status(403).send(loggedOutHomeView);
    }
  }

  @Get("/protected")
  @Use(requireAuth)
  getProtected(request: RequestWithBody, response: Response) {
    response.status(200).send(protectedView);
  }
}
