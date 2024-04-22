import express from "express";
import {
    addMatchScore,
    getAllGames,
    getLeaderboard,
    getMyScore
} from "../controllers/index.js";
import { asyncEventHandler } from "../errors/errorUtils/index.js";
import { errorMiddleware } from "../errors/errorMiddlewares/index.js";
import { verifyAccessToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/ping", (req, res) => {
    res.send({
        pong: "Hello world!"
    });
});

router.patch(
    "/add-match-score",
    verifyAccessToken,
    asyncEventHandler(addMatchScore)
);

router.get("/games", asyncEventHandler(getAllGames));

router.get("/leaderboard/:gameId", asyncEventHandler(getLeaderboard));
router.get("/get-my-score/:gameId", verifyAccessToken, asyncEventHandler(getMyScore));

router.use(errorMiddleware);

export default router;
