import {RequestWithBody} from "../interfaces/routeInterfaces";
import {Response} from "express";
import {loginErrorMessage, loginFormView} from "../views/viewData";
import {BodyValidator, Controller, Get, Post} from "./decorators";

@Controller("")
class LoginController {
  @Get("/login")
  getLogin(request: RequestWithBody, response: Response): void {
    response.send(loginFormView);
  }

  @Post("/login")
  @BodyValidator("email", "password")
  postLogin(request: RequestWithBody, response: Response): void {
    const {email, password} = request.body;

    if (email === "username" && password === "password") {
      // mark this person as logged in
      request.session = {loggedIn: true};
      // redirect to the root route
      response.redirect("/");
    } else {
      response.status(422).send(loginErrorMessage + loginFormView);
    }
  }

  @Get("/logout")
  getLogout(request: RequestWithBody, response: Response): void {
    request.session = undefined;
    response.redirect("/");
  }
}


