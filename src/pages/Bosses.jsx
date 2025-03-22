import React, { useState, useEffect } from "react";
import axios from "axios";

const Bosses = () => {
  const [allBosses, setAllBosses] = useState([]);
  const [randomBoss, setRandomBoss] = useState(null);
  const [blur, setBlur] = useState(15);
  const [searchQuery, setSearchQuery] = useState("");
  const [guessList, setGuessList] = useState([]);
  const [correctGuess, setCorrectGuess] = useState(false);
  const [guesses, setGueses] = useState(0);

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

  const getRandomBoss = (bosses) => {
    const randomIndex = Math.floor(Math.random() * bosses.length);
    return bosses[randomIndex];
  };

  const filteredBosses = allBosses.filter((boss) =>
    boss.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectBoss = (boss) => {
    setSearchQuery(boss.name);

    setGuessList((prevGuesses) => [boss, ...prevGuesses]);
    setGueses(guesses + 1);
    if (boss.name !== randomBoss.name) {
      setSearchQuery("");
      setBlur((prevBlur) => Math.max(0, prevBlur - 1));
    } else {
      setBlur(0);
      setCorrectGuess(true);
      setSearchQuery("");
    }

    removeBoss(boss.id);
  };

  const removeBoss = (bossId) => {
    const updatedBosses = allBosses.filter((boss) => boss.id !== bossId);
    setAllBosses(updatedBosses);
  };

  if (!randomBoss) return <div>Loading...</div>;

  return (
    <>
      <h1>Which OSRS boss is this?</h1>
      <div className="boss-main">
        <div className="boss-card">
          <img
            src={randomBoss.image}
            alt={randomBoss.name}
            className={`boss-img ${correctGuess ? "correct-boss" : ""}`}
            style={{
              filter: `blur(${blur}px)`,
            }}
          />
        </div>
        <div className="boss-input">
          {!correctGuess && (
            <>
              <input
                className="boss-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type boss name..."
              />
              {searchQuery && (
                <ul className="boss-ul">
                  {filteredBosses.length > 0 ? (
                    filteredBosses.map((boss) => (
                      <li
                        key={boss.id}
                        className="boss-li"
                        onClick={() => handleSelectBoss(boss)}
                      >
                        <img
                          src={boss.image}
                          className="boss-list-img"
                          alt={boss.name}
                        />
                        {boss.name}
                      </li>
                    ))
                  ) : (
                    <li className="boss-li">No bosses found.</li>
                  )}
                </ul>
              )}
            </>
          )}

          <ul className="guessed-boss-ul">
            {guessList.map((boss) => (
              <li
                key={boss.id}
                className={`guessed-boss-li ${
                  boss.name === randomBoss.name
                    ? "correct-guess"
                    : "wrong-guess"
                }`}
              >
                <img
                  src={boss.image}
                  alt={boss.name}
                  className="boss-list-img boss-guess-img"
                />
                {boss.name}
              </li>
            ))}
          </ul>
        </div>
        {correctGuess && (
          <div className="correct-display">
            <h3 className="correct-title">Nicely done!</h3>
            <div className="correct-con">
              You guessed:
              <div className="correct-info">
                <img
                  className="correct-image"
                  src={randomBoss.image}
                  alt={randomBoss.name}
                />
                <div>
                  <h4 className="correct-boss-name">{randomBoss.name}</h4>
                  <p className="correct-number">Number of tries: <b>{guesses}</b></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Bosses;
