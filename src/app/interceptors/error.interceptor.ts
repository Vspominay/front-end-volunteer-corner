import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from "@ngxs/store";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Logout } from "../entities/authentication/state/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private store: Store) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
               .pipe(catchError(err => {
                 const error = err.error ? {
                   message: err.error.errorMessage,
                 } : { message: err.errorMessage };

                 if (err.status === 401) {
                   this.store.dispatch(new Logout());

                 }
                 return throwError(() => error);
               }));
  }
}
