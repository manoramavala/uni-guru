import React from "react";

const Loginbox: React.FC = () => {
  return (
    <div className="login-box">
      <p
        style={{
          textAlign: "left",
          fontFamily: "inder",
          fontSize: "5vh",
          color: "black",
          fontWeight: "bold",
        }}
      >
        login
      </p>

      <div className="input-box">
        <input type="text" placeholder="Username" required />
      </div>

      <div className="input-box">
        <input type="password" placeholder="Password" required />
      </div>

      <div className="forget">
        <label>
          <input type="checkbox" />
          <a href="#"> Forget password?</a>
        </label>
      </div>

      <button
        type="submit"
        className="log-box-btn"
        style={{
          border: "solid 1px",
          padding: "5px",
        }}
      >
        Login
      </button>

      <div className="log-signup-link">
        <p>
          Don't have an account?
          <a href="#">sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Loginbox;
