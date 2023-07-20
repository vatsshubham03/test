import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { callLoginApi } from "../../api/journey";
import "./index.css";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  console.log(formValue);
  const history = useHistory();
  const login = async () => {
    callLoginApi(formValue);
  };

  return (
    <div className="login-form">
      <form>
        <h1>Login</h1>
        <div className="content">
          <div className="input-field">
            <input
              name="email"
              type="email"
              placeholder="Email"
              autocomplete="nope"
              onChange={handleChange}
              pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
            />
          </div>
          <div className="input-field">
            <input
              name="password"
              type="password"
              placeholder="Password"
              autocomplete="new-password"
              onChange={handleChange}
              pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/"
            />
          </div>
        </div>
        <div className="action">
          <button onClick={() => history.push("/signup")}>Register</button>
          <button onClick={() => login}>Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
