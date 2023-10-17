import "./Login.css";

export function Login() {
  return (
    <div className="loginContainer">
      <h1>SIGN IN TO YOUR ACCOUNT</h1>

      <form className="loginForm">
        <input type="email" name="email" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />

        <div>
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            value="true"
          />
          <label for="rememberMe">Remember me</label>
        </div>

        <button type="submit">Login Now</button>
      </form>
    </div>
  );
}
