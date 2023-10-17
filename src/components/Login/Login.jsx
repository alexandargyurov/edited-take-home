import axios from "axios";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import { AuthContext } from "../../App";
import { Button } from "../Button/Button";

import "./Login.css";

export function Login() {
  const [resError, setResError] = useState();
  const [, setUser] = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem("userEmail") ?? "",
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
    await axios
      .post("/login", values)
      .then((res) => {
        setUser({ email: res.data.email });
        if (values.rememberMe) {
          localStorage.setItem("userEmail", res.data.email);
        } else {
          localStorage.removeItem("userEmail");
        }
      })
      .catch((e) => setResError(e.response.data.message));
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

        {resError && <p>{resError}</p>}

        <Button type="submit" disabled={!formik.isValid}>
          Login Now
        </Button>
      </form>
    </div>
  );
}
