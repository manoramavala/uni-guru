import React from "react";

const Signupbox: React.FC = () => {
  return(
    <div className="signup-box">
      <p
        style={{
          textAlign: "left",
          fontFamily: "inder",
          fontSize: "5vh",
          color: "black",
          fontWeight: "bold",
        }}
      >
        Sign up
      </p>

      <div className="input-box">
        <input type="text" placeholder="Name" required />
      </div>

      <div className="input-box">
        <input type="Email" placeholder="Email" required />
      </div>

      <div className="input-box">
        <input type="password" placeholder="Password" required />
      </div>


      <button
        type="submit"
        className="sign-box-btn"
        style={{
          border: "solid 1px",
          padding: "5px",
        }}
      >
        Sign up
      </button>

      <p style={{textAlign:'center'}}>or</p>

    </div>
  )
}
export default Signupbox;