import {NextFunction, Response, Router} from "express";
import {RequestWithBody} from "../interfaces/routeInterfaces";
import {
  errorMessage,
  loggedInHomeView,
  loggedOutHomeView,
  loginFormView,
  protectedView,
  unprotectedView
} from "../views/viewData";

function requireAuth(request: RequestWithBody, response: Response, next: NextFunction): void{
  if (request.session && request.session.loggedIn) {
    next();
    return
  }

  response.status(403).send(unprotectedView);
}

const router = Router();

router.get("/login", (request: RequestWithBody, response: Response) => {
  response.send(loginFormView);
});

router.post("/login", (request: RequestWithBody, response: Response) => {
  const {email, password} = request.body;

  if (email && password && email === "username" && password === "password") {
    // mark this person as logged in
    request.session = {loggedIn: true};
    // redirect to the root route
    response.redirect("/");
  } else {
    response.status(422).send(errorMessage + loginFormView);
  }
});

router.get("/logout", (request: RequestWithBody, response: Response) => {
  request.session = undefined;
  response.redirect("/");
});

router.get("/protected", requireAuth, (request: RequestWithBody, response: Response) => {
  response.status(200).send(protectedView);
});

router.get("/", (request: RequestWithBody, response: Response) => {
  if (request.session && request.session.loggedIn) {
    response.status(200).send(loggedInHomeView);
  } else {
    response.status(403).send(loggedOutHomeView);
  }
});

export {router};
