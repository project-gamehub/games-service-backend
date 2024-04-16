import Leaderboard from "../models/leaderboardModel.js";

class LeaderboardRepository {
    async getOneByData(data, getFields = "") {
        const gameData = await Leaderboard.findOne(data, getFields);
        return gameData;
    }

    async addMatchScore(gameId, score, UserId) {
        const gameData = await Leaderboard.findOne({
            gameId
        });
        for (let user of gameData.data) {
            if (user.userId == UserId) {
                user.score += parseInt(score);
                user.totalMatches++;
                break;
            }
        }
        await gameData.save();
    }

    async createUserAndAddMatchScore(gameId, score, UserId) {
        await Leaderboard.findOneAndUpdate(
            { gameId },
            {
                $push: {
                    data: {
                        userId: UserId,
                        score
                    }
                }
            },
            { new: true }
        );
    }
}

export default LeaderboardRepository;
