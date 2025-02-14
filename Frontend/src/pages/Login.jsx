import { useState } from "react";
import "../styles/Auth.css"; // Import the custom CSS file
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Login, Signup } from "../services/serviceApi";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
const method = useForm({
  defaultValues:{
    email: "",
    password: "",
    confirmPassword: ""
  }
})
const AuthMutation = useMutation({
  mutationFn: (data)=>{
    if(isLogin){
      const sendData = {
        email: data.email,
        password: data.password
      }
      return Login(sendData)
    }
    else{
      return Signup(data)
    }
  },
  onSuccess:(data)=>{
    if(isLogin === false){
      if(data.success){
        setIsLogin(true)
      }
    }
    else{
      if(data.success){
        localStorage.setItem("familytree", data.token)
        window.location.href = "/"
      }
    }
  }
})
const onSubmit = (data)=>{
  console.log("called")
  AuthMutation.mutate(data)
}
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
        <form onSubmit={method.handleSubmit(onSubmit)}>
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

export default AuthPage;
