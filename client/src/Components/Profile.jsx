import Axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Following from "./Following";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function Profile({ user }) {
  Axios.defaults.withCredentials = true;
  const [usersList, setUsersList] = useState([]);
  const [loginUser, setLoginUser] = useState("");
  const [idUser, setIdUser] = useState();
  const [following, setFollowing] = useState([]);
  const [f, setF] = useState([]);
  const { username } = useParams();
  const [userl, setUserl] = useState([]);
  const [fol, setFol] = useState(false);

  const res = user.filter((u) => u.username === username);

  useEffect(() => {
    if (res.length === 0) {
      console.log("userempty");

      Axios.post("http://localhost:3001/users", {
        username: username,
      }).then((ex) => {
        if (ex.data.message) {
          console.log(ex.data.message);
        } else {
          setUsersList(ex.data);
        }
      });
    }

    Axios.get("http://localhost:3001/login").then((ex) => {
      if (ex.data.loggedIn == true) {
        setLoginUser(ex.data.user[0].username);
        setIdUser(ex.data.user[0].userid);
      } else {
        window.location = "/login";
      }
    });
  }, []);

  const onFollow = (userName) => {
    Axios.post("http://localhost:3001/follow", {
      userid: idUser,
      followingid: userName,
    }).then((ex) => {
      alert("followed");
    });
  };

  const showFollowing = (id) => {
    Axios.post("http://localhost:3001/getting", { idUser: id }).then((ex) => {
      setUserl(ex.data);
      console.log(ex.data);
      setFol(true);
    });
    setFollowing(userl.map((v) => v.following_id));

    Axios.post("http://localhost:3001/getfollowers", {
      userid: following,
    }).then((ex) => {
      console.log(ex.data);
    });
    // following.filter((v) => {
    //   if (v.user_id == idUser) {
    //     userl.filter((vv) => {
    //       if (vv.userid == v.following_id) {
    //
    //       }
    //     });
    //   }
    // });
  };
  const closePopup = () => {
    setFol(false);
  };
  return (
    <div>
      {username === loginUser ? (
        <div>
          {res.map((val, key) => {
            return (
              <div className="profile" key={key}>
                <img
                  className="profilepic"
                  src="https://i.pinimg.com/originals/62/2f/9d/622f9d0cfaf3bdd69fba4046103363e2.jpg"
                  alt=""
                />
                <div className="inf">
                  <p className="username">{val.username}</p>
                  <button className="editprofile" onClick={onFollow}>
                    Edit profile
                  </button>
                </div>
                <span></span>

                <button
                  onClick={() => {
                    showFollowing(val.userid);
                  }}
                >
                  Following
                </button>
                <div>
                  {fol ? (
                    <div className="popupmain">
                      <div className="popup">
                        <div className="popup_header">
                          <p onClick={closePopup}>X</p>
                          <h6>Following</h6>
                        </div>
                        <p></p>
                        {/* <a href={"/profile/" + f.map((v) => v.username)}>
                          {f.map((v) => v.username)}
                        </a> */}
                        <br />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <p className="name">{val.name}</p>
                <p className="bio">{val.Bio}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {usersList.map((val, key) => {
            return (
              <div className="profile" key={key}>
                <img
                  className="profilepic"
                  src="https://i.pinimg.com/originals/62/2f/9d/622f9d0cfaf3bdd69fba4046103363e2.jpg"
                  alt=""
                />
                <div className="inf">
                  <p className="username">{val.username}</p>
                  <button
                    className="follow"
                    onClick={() => {
                      onFollow(val.userid);
                    }}
                  >
                    Follow
                  </button>
                  <p className="name">{val.name}</p>
                  <p className="bio">{val.Bio}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Profile;
