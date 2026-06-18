import { Link } from "react-router";
import { AuthHeader } from "../components/AuthHeader";
import "./LandingPage.css";
import { useEffect } from "react";
export function LandingPage() {
    useEffect(() => {
  document.title = "Shoppie";
}, []);
  return (
    <>
      <AuthHeader />

      <div className="landing-page">
        <div className="hero-section">
          <h1>Shop Smarter, Live Better</h1>

          <p>
            Discover thousands of products at the
            best prices with fast and secure checkout.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="hero-button">
              Sign Up
            </Link>

            <Link to="/signin" className="hero-button secondary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}