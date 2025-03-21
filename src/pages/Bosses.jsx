import React, { useState, useEffect } from "react";
import axios from "axios";

const Bosses = () => {
  const [allBosses, setAllBosses] = useState([]);
  const [randomBoss, setRandomBoss] = useState(null);
  const [blur, setBlur] = useState(15);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchBosses = async () => {
      try {
        const response = await axios.get("/assets/data/bosses.json");
        setAllBosses(response.data);
        setRandomBoss(getRandomBoss(response.data));
      } catch (error) {
        console.error("Error fetching bosses:", error);
      }
    };

    fetchBosses();
  }, []);

  const changeBlur = () => {
    setBlur(blur - 1);
  };

  const getRandomBoss = (bosses) => {
    const randomIndex = Math.floor(Math.random() * bosses.length);
    return bosses[randomIndex];
  };

  const filteredBosses = allBosses.filter((boss) =>
    boss.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!randomBoss) return <div>Loading...</div>;

  return (
    <>
      <h1>Random OSRS Boss</h1>
      <div className="boss-main">
        <div className="boss-card">
          <img
            src={randomBoss.image}
            alt={randomBoss.name}
            className="boss-img"
            style={{
              filter: `blur(${blur}px)`,
            }}
            onClick={() => changeBlur()}
          />
        </div>
        <div className="boss-input">
          <input
            className="boss-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Type boss name..."
          />
          {searchQuery && ( 
            <ul className="boss-ul">
              {filteredBosses.map((boss) => (
                <li key={boss.id} className="boss-li">
                  <img src={boss.image} className="boss-list-img" alt={boss.name} />{" "}
                  {boss.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Bosses;
