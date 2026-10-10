import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router";

function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [message, setMessage] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
    const form = new FormData(event.target);
    axios
      .post(`${import.meta.env.VITE_API_URL}login.php`, {
        email: form.get("email"),
        password: form.get("password")
      })
      .then((response) => {
        sessionStorage.setItem("access_token", response.data.jwt);
        sessionStorage.setItem("userdata", response.data.data);
        window.location.href='./dashboard';
      })
      .catch(() => {
        setMessage("An error occurred while creating your account. Please try again.");
      });
  } 

    return (
        <div className="login-page">
            <div className="login-left">
                <div className="login-overlay"></div>
                <div className="login-left-content">
                    <div className="login-brand">
                        <img src="/assets/images/logo.png" alt="Nirmanic"/>
                        <div>
                            <h2>NIRMANIC</h2>
                            <p>Construction Management</p>
                        </div>
                    </div>
                    <div className="login-hero-text">
                        <h1>Build Better<br />Projects{" "}<span>Together</span></h1>
                        <p> Nirmanic helps you manage your construction projects, clients, teams and resources — all in one powerful platform.</p>
                    </div>
                    <div className="login-features">
                        <div className="login-feature">
                            <div className="feature-icon">
                                <i className="mdi mdi-clipboard-text-outline"></i>
                            </div>
                            <div>
                                <h4>Project Management</h4>
                                <p>Track progress, milestones and deadlines</p>
                            </div>
                        </div>
                        <div className="login-feature">
                            <div className="feature-icon">
                                <i className="mdi mdi-account-group-outline"></i>
                            </div>
                            <div>
                                <h4>Client Management</h4>
                                <p>Keep your client information organized</p>
                            </div>
                        </div>
                        <div className="login-feature">
                            <div className="feature-icon">
                                <i className="mdi mdi-account-multiple-outline"></i>
                            </div>
                            <div>
                                <h4>Team Collaboration</h4>
                                <p>Work together, get more done</p>
                            </div>
                        </div>
                        <div className="login-feature">
                            <div className="feature-icon">
                                <i className="mdi mdi-chart-bar"></i>
                            </div>
                            <div>
                                <h4>Reports & Analytics</h4>
                                <p>Make data-driven decisions</p>
                            </div>
                        </div>
                    </div>
                    <div className="login-left-footer">
                        <span>From Foundation</span><br /><span>to Success</span>
                        <div className="footer-line"></div>
                    </div>
                </div>
            </div>
            <div className="login-right">
                <div className="login-decoration decoration-one"></div>
                <div className="login-decoration decoration-two"></div>
                <div className="login-card">
                    <div className="login-card-logo">
                        <img src="/assets/images/logo.png" alt="Nirmanic"/>
                        <h2>NIRMANIC</h2>
                        <p>Construction Management</p>
                    </div>
                    <div className="login-heading">
                        <h1>Welcome Back</h1>
                        <p>Sign in to your account to continue</p>
                    </div>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email or Username</label>
                            <div className="input-wrapper">
                                <i className="mdi mdi-email-outline"></i>
                                <input name="email" id="email" type="text" className="form-control" placeholder="Enter your email or username" required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
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
                        <div className="login-options">
                            <label className="remember-me">
                                <input  type="checkbox" name="remember" />
                                <span className="custom-checkbox"><i className="mdi mdi-check"></i></span>
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="forgot-link"> Forgot password?</Link>
                        </div>
                        <button type="submit" className="login-button" >
                            <span>Sign In</span>
                            <i className="mdi mdi-arrow-right"></i>
                        </button>
                        <p className="login-status" role="status" aria-live="polite">
                            {message}
                        </p>
                        <div className="login-bottom">
                            <span> Don't have an account?</span>
                            <Link to="/register">Register Now</Link>
                        </div>
                    </form>
                </div>
                <div className="blueprint-decoration">
                    <i className="mdi mdi-office-building-outline"></i>
                </div>
            </div>
        </div>
    );
}

export default Login;