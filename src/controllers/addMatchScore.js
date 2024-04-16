import { customError } from "../errors/errorUtils/index.js";
import LeaderboardService from "../services/leaderboardService.js";

const addMatchScore = async (req, res) => {
    const gameId = req.body?.gameId;
    const score = req.body?.score;

    const userId = req.userId;
    if (!score || !gameId) {
        throw new customError(400, "Invalid data");
    }
    const leaderboardService = new LeaderboardService();
    await leaderboardService.addMatchScore(gameId, score, userId);
    return res.status(200).json({
        message: "Successfully added the score",
        success: true
    });
};

export default addMatchScore;
