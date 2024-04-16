import express from "express";
import router from "./routes/index.js";

import { PORT } from "./config/index.js";
import { connectWithDB } from "./utils/index.js";

// import Game from "./models/gameModel.js";
import Leaderboard from "./models/leaderboardModel.js";

const app = express();

// TODO Add Limit on this
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

const server = app.listen(PORT, async () => {
    console.log("gamesService is listening on:", PORT);
    connectWithDB().catch(() => {
        console.log("Error connecting MongoDB");
    });
    // await Game.create({
    //     gameName: "Snake Game",
    //     gameSlug: "snake-game",
    //     description: "A snake Game",
    //     gameLink: "gamelink.com"
    // })
    // await Leaderboard.create({
    //     gameId: "661edca90ceea3ee183a90dc",
    //     description: "Leaderboard of snake game",
    //     data: [
    //         {
    //             userId: "65ff766abbcbc8a7b161d6cc",
    //             score: 75,
    //             totalMatches: 9
    //         },
    //         {
    //             userId: "65ff7f353105082f8d3b4449",
    //             score: 10,
    //             totalMatches: 5
    //         },
    //         {
    //             userId: "66047a172817a5ae214d3e44",
    //             score: 100,
    //             totalMatches: 15
    //         },
    //         {
    //             userId: "66047c4f09325abe48705581",
    //             score: 50,
    //             totalMatches: 4
    //         },
    //         {
    //             userId: "6611a7e2c188dcce87bb500e",
    //             score: 60,
    //             totalMatches: 4
    //         }
    //     ]
    // })
});

process.on("unhandledRejection", (err) => {
    console.log(`Unhandled rejection ${err.name} occurred`);
    server.close(() => {
        process.exit(1);
    });
});
