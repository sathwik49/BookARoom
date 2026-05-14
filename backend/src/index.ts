import express, { Response } from "express";
import cors from "cors";
import "dotenv/config";
import appConfig from "./config/appConfig";
import { mainRouter } from "./routes/mainRouter";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import { logger } from "./middleware/logger";

const app = express();
const PORT = appConfig.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin(requestOrigin, callback) {
      if (
        !requestOrigin ||
        appConfig.FRONTEND_ORIGINS.includes(requestOrigin)
      ) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${requestOrigin}`));
      }
    },
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(logger);

app.get("/health", (_, res: Response) => {
  return res.status(200).json({ message: "Server running" });
});

app.use(appConfig.BASE_PATH, mainRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
