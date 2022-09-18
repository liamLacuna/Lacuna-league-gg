import React, { useState } from "react";
import { getPlayerGamesProxy } from "./proxy/getPastGame";

function App() {
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([]);

  async function getPlayerGames(){
    const list = await getPlayerGamesProxy(searchText);
    setGameList(list);
  };

  console.log("gamelist: ", gameList);

  return (
    <div>
      <h2>Welcome to Lacuna.GG</h2>
      <input
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
      <button onClick={getPlayerGames}>
        {" "}
        Get the past 5 games from your player
      </button>
      {gameList.length !== 0 ? (
        <>
          <p>We have data!</p>
          {gameList.map((gameData, index) => (
            <>
              <h2>Game {index + 1}</h2>
              <div>
                {gameData.info.participants.map((data, participantIndex) => (
                  <p>
                    PLAYER {participantIndex + 1}: {data.summonerName}, KDA:
                    {data.kills} | {data.deaths} | {data.assists}
                  </p>
                ))}
              </div>
            </>
          ))}
        </>
      ) : (
        <>
          <p>We have NO Data!</p>
        </>
      )}
    </div>
  );
}

export default App;
