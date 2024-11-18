import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
    {
        gameId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game",
            required: true
        },
        description: {
            type: String
        },
        data: {
            type: [
                {
                    userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true
                    },
                    score: {
                        type: Number,
                        required: true
                    },
                    totalMatches: {
                        type: Number,
                        required: true,
                        default: 1
                    },
                    lastScoreAddedDate: {
                        type: Date,
                        default: new Date()
                    },
                    scoresAddedToday: {
                        type: Number,
                        default: 0
                    }
                }
            ],
            default: []
        }
    },
    { timestamps: true }
);

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

export default Leaderboard;
