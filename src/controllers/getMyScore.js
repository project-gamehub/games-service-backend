import LeaderboardService from "../services/leaderboardService.js";

const getMyScore = async (req, res) => {
    const gameId = req.params.gameId;

    const userId = req.userId;
    const leaderboardService = new LeaderboardService();
    const data = await leaderboardService.getMyScore(gameId, userId);
    return res.status(200).json({
        message: "Successfully fetched the score",
        data,
        success: true
    });
};

export default getMyScore;
