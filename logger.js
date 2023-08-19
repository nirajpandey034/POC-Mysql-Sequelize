const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, prettyPrint } = format;
const CATEGORY = "Shop DB Logs";

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    format.json()
  ),
  transports: [
    //new transports:
    new transports.File({
      filename: "logs/Errors.log",
    }),
    new transports.Console(),
  ],
  //...
});

module.exports = logger;
