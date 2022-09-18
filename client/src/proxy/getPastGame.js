import axios from "axios";

export const getPlayerGamesProxy = (searchText) => 
  axios
    .get("http://localhost:4000/past5games", {
      params: { username: searchText },
    })
    .then(function (response) {
        console.log("response", response.data)
        return response.data
      }
    )
    .catch(function (error) {
      console.log(error);
    });

