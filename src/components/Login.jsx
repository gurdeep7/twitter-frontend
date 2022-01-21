
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom"
import "./login.css";
export default function Login() {
    const [form,setForm] = useState({})
    const{token, handleToken} = useContext(AuthContext)

    const handleChange = ({target:{name,value}})=>{
        setForm({
            ...form,
            [name]:value
        })
        console.log(form)
    }

    const navigate = useNavigate()

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <img style={{marginLeft:"-40%",width:"140%",height:"140%"}} src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png" alt="" />
        </div>
        <div className="loginRight">
          <form className="loginBox" >
            <input
              placeholder="Email"
              type="email"
              name="email"
              required
              className="loginInput"
              onChange={handleChange}
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              required
              minLength="6"
              className="loginInput"
              onChange={handleChange}
            />
            <button onClick={()=>{
              fetch("https://twitter-backend1.herokuapp.com/login",{
                method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify(form)
              })
              .then(res => res.json())
              .then(res => {if(res.status == "passed"){
                handleToken(res)
                navigate("/home")
              }else{
                alert("wrong login details")
              }})
            }}>Login</button>
            <button onClick={()=>{navigate("/register")}}>Sign Up</button>
            <span className="loginForgot">Forgot Password?</span>
          </form>
        </div>
      </div>
    </div>
  );
}