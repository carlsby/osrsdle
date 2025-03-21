import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Classic() {
  const [npc, setNpc] = useState(null); // Single NPC with details
  const [npcDetails, setNpcDetails] = useState(null); // To store detailed info about the NPC
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNPCs = async () => {
      const response = await axios.get(
        "https://oldschool.runescape.wiki/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:Monsters&origin=*&cmlimit=500"
      );
      console.log("Full Response:", response);
    };

    fetchNPCs();
  }, []);

  return <div></div>;
}
