import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { useState, useEffect } from "react";
import Sign from "./Components/Sign";
import Home from "./Components/Home";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

//----------ui-------------
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { TbNewSection } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Edit from "./Components/Edit";
import Results from "./Components/Results";
function App() {
  Axios.defaults.withCredentials = true;
  const [user, setUser] = useState([]);
  const [found, setFound] = useState("");
  const [us, setUs] = useState(false);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  const showResult = () => {
    setShow(true);
  };
  const onLogout = () => {
    Axios.post("http://localhost:3001/logout").then((ex) => {});
    window.location = "/login";
  };
  useEffect(() => {
    return () => {
      Axios.get("http://localhost:3001/login").then((ex) => {
        if (ex.data.loggedIn == true) {
          setUser(ex.data.user);
          //setUs(ex.data.user[0].username);
          setUs(true);
        }
      });
      Axios.get("http://localhost:3001/getusers").then((ex) => {
        setUsers(ex.data);
      });
    };
  }, [us]);

  return (
    <div className="App">
      <Router>
        {us && (
          <div className="navbar">
            <Link to="/" className="ig">
              instagram
            </Link>
            <input
              type="text"
              placeholder="Search"
              className="search"
              onClick={showResult}
              onChange={(e) => {
                setFound(e.target.value);
              }}
            />
            {found == "" ? null : <Results found={found} />}
            <Link to="/">
              <AiFillHome className="home" />
            </Link>
            <Link to="/dm">
              <HiOutlinePaperAirplane className="dms" />
            </Link>
            <Link to="/createpost">
              <TbNewSection className="cpost" />
            </Link>
            <div className="dropd">
              <DropdownButton
                id="dropdown-basic-button"
                size="sm"
                variant="white"
                title={<CgProfile className="prof" />}
              >
                <Dropdown.Item
                  href={"/profile/" + user.map((val) => val.username)}
                >
                  <CgProfile className="prof" />
                  Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <button onClick={onLogout} className="logoutbtn">
                    Log Out
                  </button>
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home setUser={setUser} />} />
          <Route
            path="/login"
            element={<Login setUser={setUser} setUs={setUs} />}
          />
          <Route
            path="/profile/:username"
            element={<Profile user={user} setUse={setUser} />}
          />
          <Route path="Sign" element={<Sign />} />
          <Route path="/accounts/edit" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
