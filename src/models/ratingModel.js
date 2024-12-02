import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
    {
        gameId: {
            type: String,
            required: true
        },
        rating: {
            type: [
                {
                    userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true
                    },
                    rating: {
                        type: Number,
                        required: true
                    }
                }
            ],
            default: []
        }
    },
    { timestamps: true }
);

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
