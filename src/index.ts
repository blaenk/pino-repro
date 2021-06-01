import Pino from "pino";
import type { PrettyOptions } from "pino-pretty";

(() => {
  let prettyPrint: PrettyOptions | boolean = false;

  if (process.env.NODE_ENV === "development") {
    prettyPrint = {
      colorize: true,
      ignore: "pid,hostname",
      translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
    };
  }

  let level = "debug";

  if (process.env.NODE_ENV === "production") {
    level = "info";
  }

  if (process.env.LOG_LEVEL) {
    level = process.env.LOG_LEVEL;
  }

  const logger = Pino({
    prettyPrint,
    level,
  });

  logger.info("This is a test");
  logger.info({ example: "value" }, "Printing an object");

  const selfReferential: any = { example: "value" };
  selfReferential.circular = selfReferential;

  logger.info(selfReferential, "Printing a self-referential object");
})();