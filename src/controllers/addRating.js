import { customError } from "../errors/errorUtils/index.js";
import RatingService from "../services/ratingService.js";

const addRating = async (req, res) => {
    const ratingValue = req.query.rating;
    if (!ratingValue) {
        throw new customError(400, "Rating value is required");
    }
    const gameId = req.params.gameId;
    const userId = req.userId;

    const ratingService = new RatingService();
    await ratingService.addRating(gameId, userId, ratingValue);
    res.status(200).json({
        message: "Rating added successfully",
        success: true
    });
};

export default addRating;
