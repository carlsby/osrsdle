import React from "react";
import placeholder from "../assets/images/placeholder.webp";
import BossIcon from "../assets/images/icons/npc.webp";
import CombatLevelIcon from "../assets/images/icons/cb.webp";
import HitpointsIcon from "../assets/images/icons/hp.webp";
import ReleaseDateIcon from "../assets/images/icons/date.png";
import AttackStyleIcon from "../assets/images/icons/combat.webp";
import LocationIcon from "../assets/images/icons/location.png";

export default function Classic() {
  return (
    <div className="classic-boxes">
      <table className="classic-table">
        <tbody>
          <tr>
            <th>
              <span className="icon-text-container">
                <img src={BossIcon} className="classic-th-icon" />
                Boss
              </span>
            </th>
            <th>
              <span className="icon-text-container">
                <img src={CombatLevelIcon} className="classic-th-icon" />
                Combat Level
              </span>
            </th>
            <th>
              <span className="icon-text-container">
                <img src={HitpointsIcon} className="classic-th-icon" />
                Hitpoints
              </span>
            </th>
            <th>
              <span className="icon-text-container">
                <img src={ReleaseDateIcon} className="classic-th-icon" />
                Release Date
              </span>
            </th>
            <th>
              <span className="icon-text-container">
                <img src={AttackStyleIcon} className="classic-th-icon" />
                Attack Style
              </span>
            </th>
            <th>
              <span className="icon-text-container">
                <img src={LocationIcon} className="classic-th-icon" />
                Location
              </span>
            </th>
          </tr>
          <tr>
            <td className="">
              <img className="classic-boss-img" src={placeholder} alt="Boss" />
            </td>
            <td className="">128</td>
            <td className="">115</td>
            <td className="">3 May 2018</td>
            <td className="">Ranged, Melee, Magic</td>
            <td className="">Varrock Sewers</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
