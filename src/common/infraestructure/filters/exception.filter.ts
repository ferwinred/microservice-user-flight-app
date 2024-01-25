import { Catch, RpcExceptionFilter, ArgumentsHost, NotFoundException, Logger } from '@nestjs/common';
import { NotFoundError, Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {

    private readonly logger = new Logger(ExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {

    const error = exception.getError() as any;

    this.logger.error(`Status: ${error.status} Error: ${JSON.stringify(error.message)}`);

    return throwError(() => { 
        return error;
     });
  }
}