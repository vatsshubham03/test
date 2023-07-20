import React, {useState} from "react";
import { callLoginApi } from "../../api/journey";
import './index.css';

const SignUp = () => {
  const login = async () => {
    let data = {
      email: "hgdhsgdhsdd@gmail.com",
      password: "shubham@123",
    };
    callLoginApi(data);
  };
  const initialValues = {
    name:'',
    email:'',
    mobile:'',
    password:'',
  }
  const [formValue, setFormValue] = useState(initialValues)
  const handleChange = (e) => {
    const{name, value} = e.target;
    setFormValue({...formValue,[name]:value})
  }
  console.log(formValue);

  
  return (
<div className="login-form">
  <form>
    <h1>Sign Up</h1>
    <div className="content">
    <div className="input-field">
        <input name="name" type="name" placeholder="Name" autocomplete="nope" onChange={handleChange}/>
      </div>

      <div className="input-field">
        <input name="email" type="email" placeholder="Email" autocomplete="nope" onChange={handleChange}/>
      </div>
      <div className="input-field">
        <input name="mobile" type="mobile" placeholder="Mobile" autocomplete="nope" onChange={handleChange}/>
      </div>

      <div className="input-field">
        <input name="password" type="password" placeholder="Password" autocomplete="new-password" onChange={handleChange}/>
      </div>
      <a href="#" className="link">Don't have an account? Sign in</a>
    </div>
    <div className="action">
      {/* <button>Register</button> */}
      <button>Sign up</button>
    </div>
  </form>
</div>
  );
};  

export default SignUp;
