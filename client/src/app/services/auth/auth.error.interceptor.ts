import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { AuthService } from '@services/auth/auth.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                if ([401, 403].includes(err.status)) {
                    this.authService.logout();
                }

                const error = err.error.message || err.statusText;
                return throwError(() => error);
            }),
        );
    }
}
