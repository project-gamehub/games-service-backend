import RatingService from "../services/ratingService.js";

const getRating = async (req, res) => {
    const gameId = req.params.gameId;
    const userId = req.userId;

    const ratingService = new RatingService();
    const ratingData = await ratingService.getRating(gameId, userId);
    res.status(200).json({
        message: "Rating data retreived successfully",
        data: ratingData,
        success: true
    });
};

export default getRating;
