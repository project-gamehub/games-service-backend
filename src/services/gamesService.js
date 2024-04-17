import GameRepository from "../repository/gamesRepository.js";

class GamesService {
    constructor() {
        this.gameRepository = new GameRepository();
    }

    async getAllGames() {
        const games = await this.gameRepository.getAllGames();
        return games;
    }
}

export default GamesService