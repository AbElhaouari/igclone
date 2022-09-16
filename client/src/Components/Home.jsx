import Axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Results from "./Results";
import Fv from "./Fruit&veges.json";
function Home() {
  const [found, setFound] = useState("");
  const [show, setShow] = useState(false);

  const showResult = () => {
    setShow(true);
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setFound(e.target.value)}
        onClick={showResult}
      />
      {found == "" ? null : <Results found={found} />}
      {console.log(Fv.veges)}
    </div>
  );
}

export default Home;
