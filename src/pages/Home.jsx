import React from "react";
import Button from "../Components/Shared/Button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="button-group">
      <div className="text">
        <h1>Welcome to OSRSdle!</h1>
      </div>
      <Link to="/classic">
        <Button description={"Get clues on every try"}>CLASSIC</Button>
      </Link>
      <Link to="/bosses">
        <Button description={"With a blurry card"}>BOSSES</Button>
      </Link>
      {/* <Button description={"With quest description"}>QUESTS</Button> */}
    </div>
  );
}

export default Home;
