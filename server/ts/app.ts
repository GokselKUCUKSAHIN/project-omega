import * as express from "express";
import * as morgan from "morgan";
import * as helmet from "helmet";
import * as cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

export const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
    });
});