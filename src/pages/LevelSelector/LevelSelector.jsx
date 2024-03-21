import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LevelSelector = () => {
  const navigate = useNavigate();
  const [levels, setLevels] = useState([]);

  const validateToken = async () => {
    try {
      const response = await axios({
        method: "GET",
        withCredentials: true,
        url: `${import.meta.env.VITE_API_BASE_URL}/level-selector`,
        validateStatus: function (status) {
          return status === 401 || status === 403;
        },
      });

      if (response.status === 401 || response.status === 403) {
        toast.error("Please renew your session");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getLevels = async () => {
    try {
      const response = await axios({
        method: "GET",
        withCredentials: true,
        url: `${import.meta.env.VITE_API_BASE_URL}/levels`,
        validateStatus: function (status) {
          return status === 200 || status === 500;
        },
      });

      if (response.status !== 500) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("There was an error retrieving the levels");
      }
    } catch (error) {
      console.log(error.message);
      return []; // Return an empty array as a default value
    }
  };

  const fetchLevels = async () => {
    const levels = await getLevels();
    const sortedLevels = [...levels].sort((a, b) => {
      if (a.levelSequence === b.levelSequence) {
        return a.type - b.type; // Sort by type if levelSequence is the same
      } else {
        return a.levelSequence - b.levelSequence; // Otherwise, sort by levelSequence
      }
    });
    setLevels(sortedLevels);
  };

  // Group levels by levelSequence and category
  const groupedLevels = levels.reduce((groups, level) => {
    const key = `${level.levelSequence}-${level.category}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(level);
    return groups;
  }, {});

  useEffect(() => {
    validateToken();
    fetchLevels();
  }, []);

  return (
    <>
      <h1>Level Selector</h1>
      <p>Choose a level to play</p>
      {Object.entries(groupedLevels).map(([key, levels]) => {
        const className = key.endsWith("COMPLEX")
          ? "complex-levels"
          : "basic-level";
        return (
          <div key={key} className={className}>
            {levels.map((level) => (
              <div
                key={level.id}
                className="level-card"
                onClick={() => navigate(`/level-selector/${level.id}`)}
              >
                <h2>{level.name}</h2>
                <p>{level.Score}</p>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default LevelSelector;
