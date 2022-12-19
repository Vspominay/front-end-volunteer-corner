import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from "@ngxs/store";
import { Observable } from 'rxjs';

import { environment } from "../../environments/environment";
import { AuthState } from "../entities/authentication/state/auth.state";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private readonly requestUrl = environment.requestsApi;
  private readonly proposalsUrl = environment.proposalsApi;

  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.match(this.requestUrl) || request.url.match(this.proposalsUrl)) {
      const token = this.store.selectSnapshot(AuthState.token);

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
