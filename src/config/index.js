import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const NODE_ENV = process.env.NODE_ENV;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

export { PORT, MONGOOSE_URL, NODE_ENV, USER_SERVICE_URL };
