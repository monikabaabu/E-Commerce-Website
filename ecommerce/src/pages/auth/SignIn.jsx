import { useState, useEffect } from "react";
import { Link } from "react-router";
import { AuthHeader } from "../../components/AuthHeader";
import "./SignUp.css";
import axios from "axios";


export function SignIn() {
  useEffect(() => {
    document.title = "Sign In ";
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "/api/auth/signin",
        {
          email,
          password,
        },
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage("Login Successful");
      setTimeout(() => {
        globalThis.location.href = "/home";
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login Failed");
    }
  }

  return (
    <>
      <AuthHeader />

      <div className="auth-page">
        <div className="auth-container">
          <h2 className="auth-title">Sign In</h2>
          {message && <div className="auth-message">{message}</div>}
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

            <button className="auth-button" type="submit">
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
