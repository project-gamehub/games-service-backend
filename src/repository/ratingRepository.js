import { customError } from "../errors/errorUtils/index.js";
import Rating from "../models/ratingModel.js";
import GameRepository from "./gamesRepository.js";

class RatingRepository {
    async addRating(gameId, userId, ratingValue) {
        const ratingEntry = await Rating.findOne({ gameId });
        const gameRepository = new GameRepository();

        const gameExists = await gameRepository.getGameById(gameId);
        if (!gameExists) {
            throw new customError(
                400,
                "Game with the specified ID does not exist."
            );
        }

        if (!ratingEntry) {
            const newRating = new Rating({
                gameId,
                rating: [{ userId, rating: ratingValue }]
            });
            await newRating.save();
            return newRating;
        } else {
            const userRatingIndex = ratingEntry.rating.findIndex(
                (r) => r.userId.toString() === userId.toString()
            );

            if (userRatingIndex !== -1) {
                ratingEntry.rating[userRatingIndex].rating = ratingValue;
            } else {
                ratingEntry.rating.push({ userId, rating: ratingValue });
            }

            await ratingEntry.save();
            return ratingEntry;
        }
    }

    async getRating(gameId, userId = null) {
        const ratingEntry = await Rating.findOne({ gameId });

        if (!ratingEntry) {
            return {
                averageRating: 0,
                totalRatings: 0,
                userRating: null
            };
        }

        const totalRatings = ratingEntry.rating.length;
        const averageRating =
            totalRatings === 0
                ? 0
                : ratingEntry.rating.reduce((sum, r) => sum + r.rating, 0) /
                  totalRatings;

        let userRating = null;

        if (userId) {
            const userRatingEntry = ratingEntry.rating.find(
                (r) => r.userId.toString() === userId.toString()
            );
            userRating = userRatingEntry ? userRatingEntry.rating : null;
        }

        return { averageRating, totalRatings, userRating };
    }
}

export default RatingRepository;
