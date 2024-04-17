import express from "express";
import { addMatchScore, getAllGames } from "../controllers/index.js";
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
    "/addMatchScore",
    verifyAccessToken,
    asyncEventHandler(addMatchScore)
);

router.get(
    "/games",
    asyncEventHandler(getAllGames)
);

router.use(errorMiddleware);

export default router;
