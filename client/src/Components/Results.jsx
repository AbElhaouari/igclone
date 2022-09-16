import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";

function Results({ found }) {
  const [user, setUser] = useState([]);
  const ref = (usern) => {
    window.location = "/profile/" + usern;
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/getusers").then((ex) => {
      setUser(ex.data);
    });
  }, [user]);
  return (
    <div className="searchResult">
      {user
        .filter((val) => {
          if (found == "") {
            return val;
          } else if (val.username.toLowerCase().includes(found.toLowerCase())) {
            return val;
          }
        })
        .map((val, key) => {
          return (
            <button onClick={() => ref(val.username)}>
              {val.name} <br />
              <div className="btnusername">{val.username}</div>
            </button>
          );
        })}
    </div>
  );
}

export default Results;
