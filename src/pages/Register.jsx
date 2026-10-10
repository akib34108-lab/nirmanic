import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import "./Login.css";

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (password !== confirmPassword) {
      setMessage("Your passwords do not match. Please try again.");
      form.elements.confirmPassword.focus();
      return;
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}register.php`, {
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password")
      })
      .then(() => {
        setMessage("Account created successfully. You can now sign in.");
      })
      .catch(() => {
        setMessage("An error occurred while creating your account. Please try again.");
      });
  }

  return (
        <div className="login-page">

            {/* =====================================================
                LEFT SIDE
            ===================================================== */}

            <div className="login-left">

                <div className="login-overlay"></div>

                <div className="login-left-content">

                    {/* Brand */}
                    <div className="login-brand">

                        <img
                            src="/assets/images/logo.png"
                            alt="Nirmanic"
                        />

                        <div>
                            <h2>NIRMANIC</h2>

                            <p>
                                Construction Management
                            </p>
                        </div>

                    </div>


                    {/* Hero */}
                    <div className="login-hero-text">

                        <h1>
                            Build Better
                            <br />

                            Projects{" "}

                            <span>Together</span>
                        </h1>

                        <p> Nirmanic helps you manage your construction projects, clients, teams and resources — all in one powerful platform.</p>

                    </div>


                    {/* Features */}
                    <div className="login-features">

                        {/* Project Management */}
                        <div className="login-feature">

                            <div className="feature-icon">

                                <i className="mdi mdi-clipboard-text-outline"></i>

                            </div>

                            <div>

                                <h4>
                                    Project Management
                                </h4>

                                <p>
                                    Track progress, milestones and deadlines
                                </p>

                            </div>

                        </div>


                        {/* Client Management */}
                        <div className="login-feature">

                            <div className="feature-icon">

                                <i className="mdi mdi-account-group-outline"></i>

                            </div>

                            <div>

                                <h4>
                                    Client Management
                                </h4>

                                <p>
                                    Keep your client information organized
                                </p>

                            </div>

                        </div>


                        {/* Team Collaboration */}
                        <div className="login-feature">

                            <div className="feature-icon">

                                <i className="mdi mdi-account-multiple-outline"></i>

                            </div>

                            <div>

                                <h4>
                                    Team Collaboration
                                </h4>

                                <p>
                                    Work together, get more done
                                </p>

                            </div>

                        </div>


                        {/* Reports */}
                        <div className="login-feature">

                            <div className="feature-icon">

                                <i className="mdi mdi-chart-bar"></i>

                            </div>

                            <div>

                                <h4>
                                    Reports & Analytics
                                </h4>

                                <p>
                                    Make data-driven decisions
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Footer */}
                    <div className="login-left-footer">

                        <span>
                            From Foundation
                        </span>

                        <br />

                        <span>
                            to Success
                        </span>

                        <div className="footer-line"></div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                RIGHT SIDE
            ===================================================== */}

            <div className="login-right">

                {/* Decorative circles */}
                <div className="login-decoration decoration-one"></div>

                <div className="login-decoration decoration-two"></div>


                {/* Top Text */}


                {/* =================================================
                    REGISTER CARD
                ================================================= */}

                <div className="login-card register-card">

                    {/* Logo */}
                    <div className="login-card-logo">

                        <img
                            src="/assets/images/logo.png"
                            alt="Nirmanic"
                        />

                        <h2>
                            NIRMANIC
                        </h2>

                        <p>
                            Construction Management
                        </p>

                    </div>


                    {/* Heading */}
                    <div className="login-heading">

                        <h1>
                            Create Account
                        </h1>

                        <p>
                            Create your account to get started
                        </p>

                    </div>


                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form onSubmit={handleSubmit} className="login-form">

                        {/* ================= FULL NAME ================= */}

                        <div className="form-group">

                            <label htmlFor="name">
                                Full Name
                            </label>

                            <div className="input-wrapper">

                                <i className="mdi mdi-account-outline"></i>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    placeholder="Enter your full name"
                                    required
                                />

                            </div>

                        </div>


                        {/* ================= EMAIL ================= */}

                        <div className="form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <div className="input-wrapper">

                                <i className="mdi mdi-email-outline"></i>

                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    required
                                />

                            </div>

                        </div>


                        {/* ================= PHONE ================= */}

                        


                        {/* ================= PASSWORD ================= */}

                        <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="input-wrapper">

                                <i className="mdi mdi-lock-outline"></i>

                                <input
    name="password"
    id="password"
    type={passwordVisible ? "text" : "password"}
    className="form-control"
    placeholder="Enter your password"
    required
/>

<button
    type="button"
    className="password-toggle"
    onClick={() => setPasswordVisible(!passwordVisible)}
>
    <i
        className={
            passwordVisible
                ? "mdi mdi-eye-outline"
                : "mdi mdi-eye-off-outline"
        }
    ></i>
</button>

                            </div>

                        </div>


                        {/* ================= CONFIRM PASSWORD ================= */}

                        <div className="form-group">

                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>

                            <div className="input-wrapper">

                                <i className="mdi mdi-lock-check-outline"></i>

                                <input
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    type={passwordVisible ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Confirm your password"
                                    required
                                />

                                <button
    type="button"
    className="password-toggle"
    onClick={() => setPasswordVisible(!passwordVisible)}
>
    <i
        className={
            passwordVisible
                ? "mdi mdi-eye-outline"
                : "mdi mdi-eye-off-outline"
        }
    ></i>
</button>

                            </div>

                        </div>


                        {/* ================= TERMS ================= */}

                        {/* ================= CREATE ACCOUNT ================= */}

                        <button
                            type="submit"
                            className="login-button register-button"
                        >

                            <span>
                                Create Account
                            </span>

                            <i className="mdi mdi-arrow-right"></i>

                        </button>
                        <p className="m-3">
                {message}
              </p>


                        {/* ================= DIVIDER ================= */}


                        {/* ================= GOOGLE ================= */}

                        {/* ================= LOGIN ================= */}

                        <div className="login-bottom">

                            <span>
                                Already have an account?
                            </span>

                            <Link to="/login">
                                Sign In
                            </Link>

                        </div>

                    </form>

                </div>


                {/* Blueprint Decoration */}
                <div className="blueprint-decoration">

                    <i className="mdi mdi-office-building-outline"></i>

                </div>

            </div>

        </div>
    );
}

export default Register;