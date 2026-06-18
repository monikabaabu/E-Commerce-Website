import { useState, useEffect } from "react";
import "./SignUp.css";
import { AuthHeader } from "../../components/AuthHeader";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
export function SignUp() {
  useEffect(() => {
    document.title = "Sign Up ";
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!name || !email || !password || !confirmPassword) {
    setError("Please fill all fields");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    await axios.post(
      "http://localhost:3000/api/auth/signup",
      {
        name,
        email,
        password
      }
    );
    localStorage.removeItem("token");
localStorage.removeItem("user");
    navigate("/signin");

  } catch (error) {
    setError(
      error.response?.data?.message ||
      "Failed to create account"
    );
  }
};

  return (
    <>
      <AuthHeader />
      <div className="auth-page">
        <div className="auth-container">
          <h2 className="auth-title">Create Account</h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              className="auth-input"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />


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

            <input
              className="auth-input"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <div className="auth-error">{error}</div>}
            <button className="auth-button" type="submit">
              Sign Up
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?{" "}
            <Link className="auth-link" to="/signin">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
