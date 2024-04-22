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

        // Sorting the leaderboard 
        leaderboard.data.sort((a, b) => {
            if (a.score !== b.score) {
                return b.score - a.score;
            } else {
                return b.totalMatches - a.totalMatches;
            }
        });
        // Sending only top 10's data 
        leaderboard.data = leaderboard.data.slice(0, 10);
        return leaderboard;
    }

    async getMyScore(gameId, userId) {
        const scoreData = await this.leaderboardRepository.getLeaderboard(
            gameId, "data -_id"
        );
        // Finding the data of the initiator
        if (!scoreData) {
            return {
                userId,
                "score": 0,
                "totalMatches": 0,
            }
        }
        const myScore = scoreData.data.find((currData) => {
            return currData.userId == userId
        });
        return myScore;
    }
}

export default LeaderboardService;
