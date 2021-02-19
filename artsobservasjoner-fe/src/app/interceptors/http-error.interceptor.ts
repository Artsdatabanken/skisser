import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

export class HttpError {
  static BadRequest = 400;
  static Unauthorized = 401;
  static Forbidden = 403;
  static NotFound = 404;
  static TimeOut = 408;
  static Conflict = 409;
  static InternalServerError = 500;
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(2),
        catchError((error: HttpErrorResponse) => {

          let errorMsg: string = '';
          const logFormat = 'background: black; color: white; padding: 10px';

          if (error instanceof HttpErrorResponse) {
            switch (error.status) {

              case HttpError.BadRequest:
                console.error('%c Bad Request 400', logFormat);
                break;

              case HttpError.Unauthorized:
                console.error('%c Unauthorized 401', logFormat);
                window.location.href = '/login' + window.location.hash;
                break;

              case HttpError.NotFound:
                //show error toast message
                console.error('%c Not Found 404', logFormat);

                this.router.navigate(['']);
                break;

              case HttpError.TimeOut:
                // Handled in AnalyticsExceptionHandler
                console.error('%c TimeOut 408', logFormat);
                break;

              case HttpError.Forbidden:
                console.error('%c Forbidden 403', logFormat);
                break;

              case HttpError.InternalServerError:
                console.error('%c Internal server error 500', logFormat);
                break;
            }
          }

          if (error.error instanceof ErrorEvent) {
            console.log('Client side error', logFormat);
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            console.log('Server side error', logFormat);
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }

          console.log('ERROR: ', errorMsg);
          return throwError(errorMsg);

        }),

      )
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }

}
