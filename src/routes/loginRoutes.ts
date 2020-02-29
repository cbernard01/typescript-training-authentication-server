import {NextFunction, Response, Router} from "express";
import {RequestWithBody} from "../interfaces/routeInterfaces";

const errorMessage: string = `
  <div>
    Please enter the correct information.
  </div>
`;
const loginFormView: string = `
  <form method="POST">
    <div>
      <label for="email">Email</label>
      <input type="text" name="email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" name="password" />
    </div>
    <button>Submit</button>
  </form>
  `;
const loggedInHomeView: string = `
  <div>
    <div>You are logged in.</div>
    <a href="/logout">Logout</a>
  </div>
`;
const loggedOutHomeView: string = `
  <div>
    <div>You are not logged in.</div>
    <a href="/login">Login</a>
  </div>
`;
const protectedView: string = `
  <div>
    <div>Welcome to protected route,</div>
    <div>logged in user!</div>
  </div>  
`;
const unprotectedView: string = `
  <div>
    <div>Denied</div>
  </div>
`;

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
