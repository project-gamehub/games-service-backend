import express from "express";
import {
    addMatchScore,
    addRating,
    getAllGames,
    getLeaderboard,
    getMyScore,
    getRating
} from "../controllers/index.js";
import { asyncEventHandler } from "../errors/errorUtils/index.js";
import { errorMiddleware } from "../errors/errorMiddlewares/index.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";

const router = express.Router();

router.get("/ping", (_, res) => {
    res.send({
        pong: "Hello world!"
    });
});

router.patch("/add-match-score", asyncEventHandler(addMatchScore));

router.get("/games", asyncEventHandler(getAllGames));

router.get("/leaderboard/:gameId", asyncEventHandler(getLeaderboard));
router.get("/get-my-score/:gameId", asyncEventHandler(getMyScore));

router.use(verifyAccessToken);
// Write all the routes which requires Access Token Below this
router.post("/add-rating/:gameId", asyncEventHandler(addRating));
router.get("/get-rating/:gameId", asyncEventHandler(getRating));

router.use(errorMiddleware);

export default router;
