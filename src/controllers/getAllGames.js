import GamesService from "../services/gamesService.js";

const getAllGames = async (req, res) => {
    const gamesService = new GamesService();
    const gamesData = await gamesService.getAllGames();
    res.status(200).json({
        message: "Games fetched successfully",
        data: gamesData,
        success: true
    });
};

export default getAllGames;
