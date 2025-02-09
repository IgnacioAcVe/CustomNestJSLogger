import { Injectable } from '@nestjs/common';
import { getTransports} from './logger.config';
import * as winston from 'winston';

@Injectable()
export class LoggerService {

    private loggerInfo: winston.Logger;
    private loggerError: winston.Logger;
    private loggerWarn: winston.Logger;
    private loggerDebug: winston.Logger;

    constructor() {
        this.createLoggers();
    }

    createLoggers() {

        this.loggerInfo = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: getTransports('info'),
        });


        this.loggerError = winston.createLogger({
            level: 'error',
            format: winston.format.json(),
            transports: getTransports('error'),
        });


        this.loggerWarn = winston.createLogger({
            level: 'warn',
            format: winston.format.json(),
            transports: getTransports('warn'),
        });


        this.loggerDebug = winston.createLogger({
            level: 'debug',
            format: winston.format.json(),
            transports: getTransports('debug'),
        });

  

      }

      info(message: string, context?: string) {
        this.loggerInfo.info(message, { context });
      }

      error(message: string, trace: string, context?: string) {
        this.loggerError.error(message, { context, trace });
      }
    
      warn(message: string, context?: string) {
        this.loggerWarn.warn(message, { context });
      }
    
      debug(message: string, context?: string) {
        this.loggerDebug.debug(message, { context });
      }

}
