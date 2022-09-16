import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function Sign() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const onSign = () => {
    Axios.post("http://localhost:3001/sign", {
      email: email,
      username: username,
      name: name,
      phone: phone,
      password: password,
    }).then((ex) => {
      console.log(ex);
      if (ex.data.message) {
        setErr(ex.data.message);
      } else {
        console.log(ex.data);
        nav("/");
      }
    });
  };

  return (
    <div className="main">
      <div className="container-1">
        <h3>Instagram</h3>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="phone number"
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <span>{err}</span>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          People who use our service may have uploaded your contact information
          to Instagram. Learn More
        </p>
        <p>
          By signing up, you agree to our Terms , Privacy Policy and Cookies
          Policy .
        </p>
        <button onClick={onSign}>Sign In</button>
      </div>
      <div className="container-2">
        <p>
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Sign;
