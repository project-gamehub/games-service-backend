import { customError } from "../errors/errorUtils/index.js";
import LeaderboardService from "../services/leaderboardService.js";

const getLeaderboard = async (req, res) => {
    const gameId = req.params.gameId;
    const leaderboardService = new LeaderboardService();
    const leaderboardData = await leaderboardService.getLeaderboard(gameId);
    if (!leaderboardData) {
        throw new customError(400, "No leaderboard found");
    }

    res.status(200).json({
        success: true,
        message: "Leaderboard fetched successfully",
        data: leaderboardData
    });
};

export default getLeaderboard;
