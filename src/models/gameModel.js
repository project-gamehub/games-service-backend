import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
    {
        gameName: {
            type: String,
            required: true
        },
        gameSlug: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        gameLink: {
            type: String,
            required: true
        },
        banners: [
            {
                type: String
            }
        ],
        isMultiplayer: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

export default Game;
