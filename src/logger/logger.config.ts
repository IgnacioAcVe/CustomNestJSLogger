import * as winston from 'winston';
import 'winston-daily-rotate-file';

type LoggerType = 'info' | 'error' | 'debug' | 'warn';


const baseConsoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, context, trace }) => {
      return `${timestamp} [${context}] ${level}: ${message}${
        trace ? `\n${trace}` : ''
      }`;
    }),
  ),
});

const createFileTransport = (loggerType: LoggerType) => {
  return new winston.transports.DailyRotateFile({
    filename: `logs/${loggerType}/${loggerType}-%DATE%.log`, // Usamos el tipo de logger en el filename
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
  });
};

// Función para generar los transports dinámicamente
export const getTransports = (loggerType: LoggerType) => {
  return [baseConsoleTransport, createFileTransport(loggerType)];
};