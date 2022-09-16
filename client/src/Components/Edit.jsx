import React, { useState } from "react";
import Axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Edit() {
  const refEmail = useRef(null);
  const refname = useRef(null);
  const refUsername = useRef(null);
  const refPhone = useRef(null);
  const refBio = useRef(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setphoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const nav = useNavigate();

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    return () => {
      Axios.get("http://localhost:3001/login").then((ex) => {
        if (ex.data.loggedIn == true) {
          setUser(ex.data.user);
          setName(ex.data.user[0].name);
          setUsername(ex.data.user[0].username);
          setEmail(ex.data.user[0].email);
          setBio(ex.data.user[0].bio);
          setphoneNumber(ex.data.user[0].phonenumber);
        } else {
          window.location = "/login";
        }
      });
    };
  }, []);
  const [user, setUser] = useState([]);
  //===============userinput

  const u = user.map((val) => val.username);

  const onUpdate = async (userid) => {
    const data = await Axios.put("http://localhost:3001/update", {
      username: username,
      name: name,
      email: email,
      phonenumber: phonenumber,
      bio: bio,
      userid: userid,
    }).then((ex) => {
      alert("submited");
      // nav("/profile/" + user.map((val) => val.username));
    });

    setName(refname.current.value);
    setUsername(refUsername.current.value);
    setEmail(refEmail.current.value);
    setBio(refBio.current.value);
    setphoneNumber(refPhone.current.value);
  };

  console.log(name);

  return (
    <div className="editform">
      {user.map((val, key) => {
        return (
          <>
            <div key={key} className="btnsection">
              Edit profile
            </div>
            <div className="editsection">
              <img
                className="editpic"
                src="https://i.pinimg.com/originals/62/2f/9d/622f9d0cfaf3bdd69fba4046103363e2.jpg"
                alt=""
              />
              <p className="usern">{val.username}</p>
              <div className="block">
                <label>Name</label>
                <input type="text" ref={refname} defaultValue={val.name} />
              </div>
              <div className="block">
                <label>Username</label>
                <input
                  aria-required="true"
                  type="text"
                  ref={refUsername}
                  defaultValue={val.username}
                />
              </div>
              <div className="block">
                <label>Bio</label>
                <input type="text" defaultValue={val.Bio} ref={refBio} />
              </div>
              <div className="block">
                <label>Email</label>
                <input type="text" defaultValue={val.email} ref={refEmail} />
              </div>
              <div className="block">
                <label>Phone number</label>
                <input
                  type="number"
                  defaultValue={val.phonenumber}
                  ref={refPhone}
                />
              </div>
              <div className="block">
                <button
                  onClick={() => {
                    onUpdate(val.userid);
                  }}
                >
                  submit
                </button>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Edit;
