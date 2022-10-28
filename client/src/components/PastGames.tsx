import React, { useState } from "react";

type PastGamesProps = {
  getPlayerGames: () => {};
};

const PastGames = (props: PastGamesProps) => {
  const { getPlayerGames } = props;

  return (
    <>
      <button onClick={getPlayerGames}>
        {" "}
        Get the past 5 games from your player
      </button>
    </>
  );
};
