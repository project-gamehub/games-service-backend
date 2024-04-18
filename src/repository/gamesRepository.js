import Game from "../models/gameModel.js";

class GameRepository {
    async getAllGames(fields = "") {
        const games = await Game.find({}, fields);
        return games;
    }
}

export default GameRepository;
