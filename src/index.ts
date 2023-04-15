import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";
import logger from "./config/logger";

mongoose.set("strictQuery", true)
mongoose
  .connect(config.mongo.connection_string)
  .then(() => {
    const server = app.listen(config.port || 8000, () => {
      logger.info(`Listening to port ${config.port}`);
    });
    const exitHandler = () => {
      if (server) {
        server.close(() => {
          logger.info("Server closed");
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    };

    const unexpectedErrorHandler = (error) => {
      logger.error(error);
      exitHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);

    process.on("SIGTERM", () => {
      logger.info("SIGTERM received");
      if (server) {
        server.close();
      }
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
