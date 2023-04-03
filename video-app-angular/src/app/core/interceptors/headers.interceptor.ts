import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment.development';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes(environment.vimeoUrl)) return next.handle(request);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.vimeoToken}`,
    });
    request = request.clone({ headers });

    return next.handle(request);
  }
}
