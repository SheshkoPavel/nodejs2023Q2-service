import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
  fileMaxSize = process.env.MAX_LOGS_FILE_SIZE_KB;
  logLevel = process.env.LOGGING_LEVEL;

  customLog() {
    this.log('Please feed the cat!');
  }

  // log(message: any, ...optionalParams: any[]) {
  //   console.log(message);
  // }

  // error(message: any, ...optionalParams: any[]) {
  //   console.log(message);
  // }

  // /**
  //  * Write a 'warn' level log.
  //  */
  // warn(message: any, ...optionalParams: any[]) {
  //   console.log(message);
  // }

  // /**
  //  * Write a 'debug' level log.
  //  */
  // debug(message: any, ...optionalParams: any[]) {
  //   console.log(message);
  // }

  // /**
  //  * Write a 'verbose' level log.
  //  */
  // verbose(message: any, ...optionalParams: any[]) {
  //   console.log(message);
  // }
}
