import axios from "axios";
import { useFormik } from "formik";
import "./Login.css";

export function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit,
    validate,
  });

  // Validates our form
  function validate(values) {
    let errors = {};

    // Email validation
    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    // Password validation
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else if (!/[a-zA-Z]/.test(values.password)) {
      errors.password = "Password must contain at least one letter";
    } else if (!/\d/.test(values.password)) {
      errors.password = "Password must contain at least one digit";
    }

    return errors;
  }

  async function onSubmit(values) {
    axios.post("/login", values);
  }

  return (
    <div className="loginContainer">
      <h1>SIGN IN TO YOUR ACCOUNT</h1>

      <form className="loginForm" onSubmit={formik.handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Username"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && <>{formik.errors.email}</>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && <>{formik.errors.password}</>}

        <div>
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            onChange={formik.handleChange}
            value={formik.values.rememberMe}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        <button type="submit" disabled={!formik.isValid}>
          Login Now
        </button>
      </form>
    </div>
  );
}
