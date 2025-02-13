import { useState } from "react";
import "../styles/Auth.css"; // Import the custom CSS file
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { useForm } from "react-hook-form";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
const method = useForm({
  defaultValues:{
    email: "",
    password: "",
    confirmPassword: ""
  }
})
  return (
    <>
    <div className="login_page">

    <h1 className="logo">Datacenter</h1>
     <div className="login-container">
      <div className="login-box">
        {/* Toggle Buttons */}
        <div className="toggle-buttons">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Title */}
        <h2 className="login-title">{isLogin ? "Login" : "Register"}</h2>

        {/* Form */}
        <form>
          <div className="input-group">
            <CustomTextInput
            control={method.control}
            name="email"
            // label="Email"
            placeholder="Enter your email"
            required={true}
            />
          </div>
          <div className="input-group">
          <CustomTextInput
            control={method.control}
            name="password"
            // label="Password"
            placeholder="Enter your password"
            required={true}
            />
          </div>
          {!isLogin && 
          <div className="input-group">
          <CustomTextInput
            control={method.control}
            name="confirmPassword"
            // label="Confirm Password"
            placeholder="Confirm your password"
            required={true}
            />          </div>
}
          {isLogin && <p className="forgot-password">Forgot Password?</p>}
          <button type="submit" className="login-button">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
    </div>
    </>
   
  );
};

export default Login;
