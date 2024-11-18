import customError from "../errors/errorUtils/customError.js";
import LeaderboardService from "../services/leaderboardService.js";

const getMyScore = async (req, res) => {
    const gameId = req.params.gameId;
    const { userId } = req.query;
    if (!userId) {
        throw new customError(400, "UserId is required");
    }
    const leaderboardService = new LeaderboardService();
    const data = await leaderboardService.getMyScore(gameId, userId);
    return res.status(200).json({
        message: "Successfully fetched the score",
        data,
        success: true
    });
};

export default getMyScore;
