import React from "react";

const Loginbox: React.FC = () => {
  return (

    
    <div className="login-box">
      <form>
      <label className="login-label">login</label>

      <div className="input-box">
        <input type="text" placeholder="Username" required />
      </div>

      <div className="input-box">
        <input type="password" placeholder="Password" required />
      </div>

      <div className="forget">
        
          <input type="checkbox"/>
          <a href="#"> Forget password?</a>
       
      

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
          <a className="signlink" href="#">sign up</a>
        </p>
      </div>
     </div> 


      </form>
    </div>
  );
};

export default Loginbox;
