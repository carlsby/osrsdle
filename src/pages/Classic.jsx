import React, { useEffect, useRef, useState } from "react";
import BossIcon from "../assets/images/icons/npc.webp";
import CombatLevelIcon from "../assets/images/icons/cb.webp";
import HitpointsIcon from "../assets/images/icons/hp.webp";
import ReleaseDateIcon from "../assets/images/icons/date.png";
import AttackStyleIcon from "../assets/images/icons/combat.webp";
import LocationIcon from "../assets/images/icons/location.png";
import axios from "axios";

export default function Classic() {
  const [allBosses, setAllBosses] = useState([]);
  const [randomBoss, setRandomBoss] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [guessList, setGuessList] = useState([]);
  const [correctGuess, setCorrectGuess] = useState(false);
  const [guesses, setGueses] = useState(0);

  const correctDisplayRef = useRef(null);

  useEffect(() => {
    if (correctGuess && correctDisplayRef.current) {
      correctDisplayRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [correctGuess]);

    useEffect(() => {
      document.title = 'Classic | OSRSdle';
    }, []);

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
    } else {
      setCorrectGuess(true);
      setSearchQuery("");
    }

    removeBoss(boss.id);
  };

  const removeBoss = (bossId) => {
    const updatedBosses = allBosses.filter((boss) => boss.id !== bossId);
    setAllBosses(updatedBosses);
    console.log(randomBoss);
  };

  const playAgain = () => {
    setCorrectGuess(false);
    setGuessList([]);
    setSearchQuery("");
    setGueses(0);
    setRandomBoss(getRandomBoss(allBosses)); 
  };

  if (!randomBoss) return <div></div>;


  return (
    <>
      <h1>Guess the boss!</h1>
      <div className="classic-boxes">
        {!correctGuess && (
          <>
            <input
              className="boss-search classic-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type boss name..."
            />
            {searchQuery && (
              <ul className="boss-ul classic-ul">
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
        {guessList.length > 0 && (
          <>
            <table className="classic-table">
              <tbody>
                <tr>
                  <th>
                    <span className="icon-text-container">
                      <img src={BossIcon} className="classic-th-icon" alt="boss-icon" />
                      Boss
                    </span>
                  </th>
                  <th>
                    <span className="icon-text-container">
                      <img src={CombatLevelIcon} className="classic-th-icon" alt="cb-icon" />
                      Combat Level
                    </span>
                  </th>
                  <th>
                    <span className="icon-text-container">
                      <img src={HitpointsIcon} className="classic-th-icon" alt="hp-icon" />
                      Hitpoints
                    </span>
                  </th>
                  <th>
                    <span className="icon-text-container">
                      <img src={ReleaseDateIcon} className="classic-th-icon" alt="rd-icon" />
                      Release Year
                    </span>
                  </th>
                  <th>
                    <span className="icon-text-container">
                      <img src={AttackStyleIcon} className="classic-th-icon" alt="as-icon" />
                      Attack Style
                    </span>
                  </th>
                  <th>
                    <span className="icon-text-container">
                      <img src={LocationIcon} className="classic-th-icon" alt="loc-icon" />
                      Location
                    </span>
                  </th>
                </tr>
                {guessList.map((boss) => (
                  <tr key={boss.id}>
                    <td style={{ animationDelay: "0s" }}>
                      <img className="classic-boss-img" src={boss.image} alt={boss.name} />
                    </td>
                    <td
                      className={`${
                        randomBoss.combat_level === boss.combat_level
                          ? "correct-guess"
                          : randomBoss.combat_level > boss.combat_level
                          ? "wrong-guess arrow-up"
                          : randomBoss.combat_level < boss.combat_level
                          ? "wrong-guess arrow-down"
                          : "wrong-guess"
                      }`}
                      style={{ animationDelay: "0.2s" }}
                    >
                      {boss.combat_level}
                    </td>
                    <td
                      className={`${
                        randomBoss.hitpoints === boss.hitpoints
                          ? "correct-guess"
                          : randomBoss.hitpoints > boss.hitpoints
                          ? "wrong-guess arrow-up"
                          : randomBoss.hitpoints < boss.hitpoints
                          ? "wrong-guess arrow-down"
                          : "wrong-guess"
                      }`}
                      style={{
                        animationDelay: "0.4s",
                      }}
                    >
                      {boss.hitpoints}
                    </td>

                    <td
                      className={`${
                        randomBoss.release_date === boss.release_date
                          ? "correct-guess"
                          : randomBoss.release_date > boss.release_date
                          ? "wrong-guess arrow-up"
                          : randomBoss.release_date < boss.release_date
                          ? "wrong-guess arrow-down"
                          : "wrong-guess"
                      }`}
                      style={{ animationDelay: "0.6s" }}
                    >
                      {boss.release_date}
                    </td>
                    <td
                      className={`${
                        randomBoss.attack_styles.slice().sort().toString() ===
                        boss.attack_styles.slice().sort().toString()
                          ? "correct-guess"
                          : randomBoss.attack_styles.some((style) =>
                              boss.attack_styles.includes(style)
                            )
                          ? "partly-guess"
                          : "wrong-guess"
                      }`}
                      style={{ animationDelay: "0.8s" }}
                    >
                      {boss.attack_styles.join(" ")}
                    </td>

                    <td
                      className={`${
                        randomBoss.location === boss.location
                          ? "correct-guess"
                          : "wrong-guess"
                      }`}
                      style={{ animationDelay: "1s" }}
                    >
                      {boss.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="color-indicators">
              <div className="indicator">
                <div className="square correct-guess"></div>
                Correct
              </div>
              <div className="indicator">
                <div className="square partly-guess"></div>
                Partial
              </div>
              <div className="indicator">
                <div className="square wrong-guess"></div>
                Incorrect
              </div>
              <div className="indicator">
                <div className="square wrong-guess arrow-up"></div>
                Higher
              </div>
              <div className="indicator">
                <div className="square wrong-guess arrow-down"></div>
                Lower
              </div>
            </div>
          </>
        )}
        {correctGuess && (
          <div ref={correctDisplayRef} className="correct-display">
            <h3 className="correct-title">Nicely done!</h3>
            <div className="correct-con">
              <div className="correct-info">
                <img
                  className="correct-image"
                  src={randomBoss.image}
                  alt={randomBoss.name}
                />
                <div>
                  <h4 className="correct-boss-name">{randomBoss.name}</h4>
                  <p className="correct-info-text">
                    <b>Combat Level:</b> {randomBoss.location}
                  </p>
                  <p className="correct-info-text">
                    <b>Hitpoints:</b> {randomBoss.hitpoints}
                  </p>
                  <p className="correct-info-text">
                    <b>Release Year:</b> {randomBoss.release_date}
                  </p>
                  <p className="correct-info-text">
                    <b>Attack Style(s)</b> {randomBoss.attack_styles.join(" ")}
                  </p>
                  <p className="correct-info-text">
                    <b>Location:</b> {randomBoss.location}
                  </p>
                  <p className="correct-number">
                    Number of tries: <b>{guesses}</b>
                  </p>
                  <button className="button play-again" onClick={() => playAgain()}>Play again</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
