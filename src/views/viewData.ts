export const errorMessage: string = `
  <div>
    Please enter the correct information.
  </div>
`;
export const loginFormView: string = `
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
export const loggedInHomeView: string = `
  <div>
    <div>You are logged in.</div>
    <a href="/logout">Logout</a>
  </div>
`;
export const loggedOutHomeView: string = `
  <div>
    <div>You are not logged in.</div>
    <a href="/login">Login</a>
  </div>
`;
export const protectedView: string = `
  <div>
    <div>Welcome to protected route,</div>
    <div>logged in user!</div>
  </div>  
`;
export const unprotectedView: string = `
  <div>
    <div>Denied</div>
  </div>
`;
