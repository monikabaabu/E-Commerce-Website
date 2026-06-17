import { useState } from "react";
import { Link } from "react-router";
import { AuthHeader } from "../../components/AuthHeader";
import "./SignUp.css";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      email,
      password
    });
  }

  return (
    <>
      <AuthHeader />

      <div className="auth-page">
        <div className="auth-container">
          <h2 className="auth-title">Sign In</h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              className="auth-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="auth-button"
              type="submit"
            >
              Sign In
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account?{" "}
            <Link className="auth-link" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}