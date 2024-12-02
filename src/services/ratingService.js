import RatingRepository from "../repository/ratingRepository.js";

class RatingService {
    constructor() {
        this.ratingRepository = new RatingRepository();
    }

    async addRating(gameId, userId, ratingValue) {
        return await this.ratingRepository.addRating(
            gameId,
            userId,
            ratingValue
        );
    }

    async getRating(gameId, userId = null) {
        return await this.ratingRepository.getRating(gameId, userId);
    }
}

export default RatingService;
