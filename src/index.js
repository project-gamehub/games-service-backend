import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import { PORT } from "./config/index.js";
import { connectWithDB } from "./utils/index.js";

const app = express();

// TODO Add Limit on this
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// TODO Configure this later
app.use(cors());

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
