import express from "express";
import router from "./routes/index.js";

import { PORT } from "./config/index.js";
import { connectWithDB } from "./utils/index.js";

const app = express();

app.use("/", router);

const server = app.listen(PORT, async () => {
    console.log("gamesService is listening on:", PORT);
    connectWithDB().catch(() => {
        console.log("Error connecting MongoDB");
    });
});

process.on("unhandledRejection", (err) => {
    console.log(`Unhandled rejection ${err.name} occurred`);
    server.close(() => {
        process.exit(1);
    });
});
