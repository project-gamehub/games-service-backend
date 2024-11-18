import { customError } from "../errors/errorUtils/index.js";
import GameRepository from "../repository/gamesRepository.js";
import LeaderboardRepository from "../repository/leaderboardRepository.js";

class LeaderboardService {
    constructor() {
        this.leaderboardRepository = new LeaderboardRepository();
        this.gameRepository = new GameRepository();
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

        const gameData = await this.gameRepository.getGameById(gameId);
        if (!gameData) {
            throw new customError(400, "Game not found");
        }

        const maxScoreAddAllowedPerDay =
            gameData?.maxScoreAddAllowedPerDay || 999;

        // Find the user in the leaderboard data
        const user = fullGameData.data.find(
            (item) => item.userId.toString() === UserId
        );

        const today = new Date();
        const isToday =
            user?.lastScoreAddedDate &&
            new Date(user.lastScoreAddedDate).toDateString() ===
                today.toDateString();

        // If user is present, adding match score and updating match count
        if (user) {
            if (isToday) {
                // Check if scoresAddedToday exceeds maxScoreAddAllowedPerDay
                if (user.scoresAddedToday >= maxScoreAddAllowedPerDay) {
                    throw new customError(
                        403,
                        "Daily score limit reached for this user"
                    );
                }
                // Update scoresAddedToday and add score
                user.scoresAddedToday += 1;
                user.lastScoreAddedDate = today;
            } else {
                // Reset scoresAddedToday and update lastScoreAddedDate
                user.scoresAddedToday = 1;
                user.lastScoreAddedDate = today;
            }

            // Update score and totalMatches
            user.score += parseInt(score);
            user.totalMatches += 1;
        } else {
            // If user does not exist, add new user to leaderboard
            fullGameData.data.push({
                userId: UserId,
                score,
                totalMatches: 1,
                lastScoreAddedDate: today,
                scoresAddedToday: 1
            });
        }

        // Save the updated leaderboard
        await fullGameData.save();
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
            gameId,
            "data -_id"
        );
        // Finding the data of the initiator
        if (!scoreData) {
            return {
                userId,
                score: 0,
                totalMatches: 0
            };
        }
        const myScore = scoreData.data.find((currData) => {
            return currData.userId == userId;
        });
        return myScore;
    }
}

export default LeaderboardService;
