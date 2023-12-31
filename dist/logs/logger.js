import path from "node:path";
import winston from "winston";
import { __dirname, __fileName } from "../config/index.js";
const options = {
    file: {
        level: "info",
        filename: path.resolve(__dirname(__fileName(import.meta.url)), "app.log"),
        handleExceptions: true,
        maxsize: 5242880,
        maxFiles: 5,
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    },
    console: {
        level: "debug",
        handleExceptions: true,
        format: winston.format.combine(winston.format.colorize(), winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston.format.simple(), winston.format.printf((info) => `[${info.timestamp}] [${process.pid}] ⚡️ ${info.level}: ${info.message}` +
            (info.splat !== undefined ? `${info.splat}` : " "))),
    },
};
const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false,
});
export class LoggerStream {
    write(message) {
        logger.info(message.substring(0, message.lastIndexOf("\n")));
    }
}
export default logger;
//# sourceMappingURL=logger.js.map