import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

function Following() {
  const [user, setUser] = useState([]);

  const [following, setFollowing] = useState([]);
  const [userid, setUserid] = useState();

  Axios.get("http://localhost:3001/login").then((ex) => {
    if (ex.data.loggedIn == true) {
      console.log(ex.data.user[0].userid);
    } else {
      window.location = "/login";
    }
  });

  useEffect(() => {
    Axios.post("http://localhost:3001/getfollowers", {
      userid: userid,
    }).then((ex) => {
      console.log(ex.data);
    });
    Axios.get("http://localhost:3001/getusers").then((ex) => {
      setUser(ex.data);
    });
  }, [user]);
  return (
    <div>
      {/* TODO fix show followed users */}
      {console.log()}
    </div>
  );
}

export default Following;
