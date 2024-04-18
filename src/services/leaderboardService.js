import { customError } from "../errors/errorUtils/index.js";
import LeaderboardRepository from "../repository/leaderboardRepository.js";

class LeaderboardService {
    constructor() {
        this.leaderboardRepository = new LeaderboardRepository();
    }

    async addMatchScore(gameId, score, UserId) {
        // Check if userId presents in the data array of gameId,
        // if presents, add this score with existing score and do totalMatches++
        // If not, push new user in data array and keep its totalMatches as 1 with provided score

        const fullGameData = await this.leaderboardRepository.getOneByData({
            gameId
        });
        if (!fullGameData) {
            throw new customError(400, "No leaderboard found");
        }

        // console.log(fullGameData.data.some(item => item.userId == UserId));
        const userPresentInLb = fullGameData.data.some(
            (item) => item.userId == UserId
        );

        // If user is present, adding match score and updating match count
        if (userPresentInLb) {
            await this.leaderboardRepository.addMatchScore(
                gameId,
                score,
                UserId
            );
        }
        // If not user, pushing user
        else {
            await this.leaderboardRepository.createUserAndAddMatchScore(
                gameId,
                score,
                UserId
            );
        }
    }

    async getLeaderboard(gameId) {
        const leaderboard = await this.leaderboardRepository.getLeaderboard(
            gameId,
            "-createdAt -updatedAt -__v"
        );
        return leaderboard;
    }
}

export default LeaderboardService;
