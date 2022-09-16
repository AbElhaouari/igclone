import React from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function Login({ setUser, setUs }) {
  Axios.defaults.withCredentials = true;
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const onLogin = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((ex) => {
      if (ex.data.message) {
        setErr(ex.data.message);
      } else {
        setUser(ex.data);
        setUs(true);
        console.log(ex.data[0].username);
        nav("/profile/" + ex.data[0].username);
      }
    });
  };
  return (
    <div className="main">
      <div className="container-1">
        <h3>instagram</h3>
        <input
          type="text"
          placeholder="username or email"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <p>{err}</p>
        <button onClick={onLogin}>log In</button>
      </div>
      <div className="container-2">
        <p>
          Don't have an account ? <Link to="/Sign">sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
