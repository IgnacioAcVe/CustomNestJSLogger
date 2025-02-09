import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

@Injectable()
export class AppService {

  constructor(

    private readonly logger: LoggerService

  ) 
  {}

  getHello(): string {

    this.logger.info('This is an example info message', 'AppService');

    this.logger.error('This is an example error message', new Error().message, 'AppService');

    this.logger.warn('This is an example warn message', 'AppService');

    this.logger.debug('This is an example debug message', 'AppService');

    return 'I love doggies!';
  }


}
