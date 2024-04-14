import mongoose from "mongoose"

const leaderboardSchema = new mongoose.Schema(
    {
        gameId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game',
        },
        description: {
            type: String
        },
        data: [
            {
                username: {
                    type: String,
                    required: true
                },
                score: {
                    type: String,
                    required: true
                },
                totalMatches: {
                    type: String,
                    required: true
                }
            }
        ]

    },
    { timestamps: true }
)

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

export default Leaderboard