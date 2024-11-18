import Game from "../models/gameModel.js";

class GameRepository {
    async getAllGames(fields = "") {
        const games = await Game.find({}, fields);
        return games;
    }

    async getGameById(gameId) {
        const game = await Game.findById(gameId);
        return game;
    }
}

export default GameRepository;
