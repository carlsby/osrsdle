import React from "react";
import Button from "../Components/Shared/Button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="button-group">
      {/* <button className="button">CLASSIC</button>
      <button className="button">BOSSES</button>
      <button className="button">QUESTS</button>
      <button className="button">ITEMS</button> */}
      <div className="text">
        <p>Welcome to OSRSdle!</p>
      </div>
      <Link to="/classic">
        <Button description={"Get clues on every try"}>CLASSIC</Button>
      </Link>
      <Link to="/bosses">
        <Button description={"With a blurry card"}>BOSSES</Button>
      </Link>
      <Button description={"With quest description"}>QUESTS</Button>
    </div>
  );
}

export default Home;
