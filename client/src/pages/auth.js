import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
    return (
      <div className="auth">
        {isLogin ? (
          <>
            <Login />
            <div className="toggle-text">
              <p>
                Don&apos;t have an account? Register below.{" "}
                <button onClick={() => setIsLogin(false)} className="toggle-btn">
                  Go to Register
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <Register />
            <div className="toggle-text">
              <p>
                Already have an account? Login below.{" "}
                <button onClick={() => setIsLogin(true)} className="toggle-btn">
                  Go to Login
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    );
  };
  const Login = () => {
    const [_, setCookies] = useCookies(["access_token"]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const result = await axios.post("https://racipe-portal-kh85.onrender.com/auth/login", {
          username,
          password,
        });
  
        setCookies("access_token", result.data.token);
        window.localStorage.setItem("userID", result.data.userID);
        navigate("/");
      } catch (error) {
        console.error("Login Error:", error);
        alert("Login failed. Check console for details.");
      }
    };
  
    return (
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="login-username">Username:</label>
            <input
              type="text"
              id="login-username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password:</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {/* You can move this button visually with CSS */}
          <button type="submit" style={{ marginTop: "20px" }}>
            Login
          </button>
        </form>
      </div>
    );
  };
    


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://racipe-portal-kh85.onrender.com/auth/register", {
        username,
        email,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Registration failed. Check console for details.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="register-username">Username:</label>
          <input
            type="text"
            id="register-username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-email">Email:</label>
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-password">Password:</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
