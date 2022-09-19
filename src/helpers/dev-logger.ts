// var fs = require("fs");
const { format, createLogger, transports } = require("winston");
const { timestamp, combine, printf, errors } = format;
var moment = require("moment");
require("winston-daily-rotate-file");

const logDir = "./log";
const dailyRotateFileTransport = (filename) =>
  new transports.DailyRotateFile({
    filename: `${logDir}/%DATE%-${filename}.txt`,
    maxSize: "1g",
    maxDays: "3d",
    zippedArchive: true,
    datePattern: "YYYY-MM-DD",
  });

const loggerr = function (filename) {
  return createLogger({
    format: combine(
      format.colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
      })
    ),
    transports: [
      new transports.Console(),
      // new transports.File({
      //   filename: `${moment().format("MMdddd")}logfile.txt`,
      // }),
      dailyRotateFileTransport(filename),
    ],
  });
};

const logger = loggerr("logfile");
module.exports = logger;
//export { logger };
