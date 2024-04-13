import express from "express";

const router = express.Router();

router.get("/ping", (req, res) => {
    res.send({
        pong: "Hello world!"
    });
});

export default router;
