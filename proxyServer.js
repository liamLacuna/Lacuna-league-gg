var express = require("express");
var cors = require("cors");
const axios = require("axios");
const { response } = require("express");

var app = express();

app.use(cors());

const API_KEY = "KEY"; //Go to https://developer.riotgames.com/ to retrive your own API key

const getPlayerPUUID = (playername) =>
  axios
    .get(
      "https://na1.api.riotgames.com" +
        "/lol/summoner/v4/summoners/by-name/" +
        playername +
        "?api_key=" +
        API_KEY
    )
    .then((response) => {
      console.log("Getting PUUID", response.data.puuid);
      return response.data.puuid;
    })
    .catch((err) => err);

app.get("/past5games", async (req, res) => {
  const playername = req.query.username;

  const PUUID = await getPlayerPUUID(playername);
  const API_CALL =
    "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" +
    PUUID +
    "/ids" +
    "?api_key=" +
    API_KEY;

  const gameIDs = await axios
    .get(API_CALL)
    .then((response) => response.data)
    .catch((err) => err);

  console.log("Getting most recent 20 gameIDs: ", gameIDs);

  var matchDataArray = [];

  for (let i = 0; i < gameIDs.length - 15; i++) {
    const matchID = gameIDs[i];
    const matchData = await axios
      .get(
        "https://americas.api.riotgames.com/lol/match/v5/matches/" +
          matchID +
          "?api_key=" +
          API_KEY
      )
      .then((response) => response.data)
      .catch((err) => err);

    matchDataArray.push(matchData);
  }

  res.json(matchDataArray);
});

app.listen(4000, function () {
  console.log("Server Started on port 4000");
});
