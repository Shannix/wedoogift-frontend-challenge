import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

  /**
   * Intercepter toutes les requetes et rajouter dans le header le token qui permet l'authentification des requetes.
   * */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const cloneRequest = request.clone({});
    /*  headers: request.headers.set("Authorization", "tokenTest123")
        .set('Access-Control-Allow-Origin', 'http://localhost:4300'),*/

    return next.handle(cloneRequest);
  }
}
