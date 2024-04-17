import Game from "../models/gameModel.js"

class GameRepository {
    async getAllGames() {
        const games = await Game.find();
        return games;
    }
}

export default GameRepository