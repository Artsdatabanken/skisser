import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

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
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(2),
        map((res: HttpResponse<any>) => {
          //console.log('INTERCEPTED RESPONSE', res, res.body);
          return res;
        }),
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
                console.error('%c Not Found 404', logFormat);

                //this.router.navigate(['']);
                break;

              case HttpError.TimeOut:
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
            errorMsg = `Client error: ${error.error.message}`;
          }
          else {
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
          }

          //console.log('ERROR: ', errorMsg);
          return throwError(errorMsg);

        })

      )
  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }

}
