import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PersistenceService } from '@services/persistence.service';
import { LocalStorageEnums } from '@config/localStorage/localStorageEnums';
import { RoutesEnums } from '@config/routes/routesEnums';
import {
    LoginRequest,
    LoginResponse,
    RegisterResponse,
} from './types/credentails.type';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private accessToken = new BehaviorSubject<string | null>(null);

    constructor(
        private http: HttpClient,
        private router: Router,
        private persistenceService: PersistenceService,
    ) {
        const accessToken = this.persistenceService.get(
            LocalStorageEnums.ACCESS_TOKEN,
        );
        if (accessToken) {
            this.accessToken.next(accessToken);
        }
    }

    login(data: LoginRequest): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(environment.apiUrl + '/auth/login', data)
            .pipe(
                map((response) => {
                    this.accessToken.next(response.accessToken);
                    this.router.navigate([RoutesEnums.MAIN]);
                    return response;
                }),
            );
    }

    register(data: LoginRequest): Observable<RegisterResponse> {
        return this.http
            .post<RegisterResponse>(environment.apiUrl + '/auth/register', data)
            .pipe(
                map((response) => {
                    this.router.navigate([
                        RoutesEnums.AUTH,
                        RoutesEnums.AUTH_LOGIN,
                    ]);
                    return response;
                }),
            );
    }

    setTokenToLS(token: string): void {
        this.persistenceService.set(LocalStorageEnums.ACCESS_TOKEN, token);
    }

    removeToken(): void {
        this.accessToken.next(null);
        this.persistenceService.removeKey(LocalStorageEnums.ACCESS_TOKEN);
    }

    get token(): string | null {
        return this.accessToken.value;
    }

    logout(): void {
        this.removeToken();
        this.router.navigate([RoutesEnums.AUTH, RoutesEnums.AUTH_LOGIN]);
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }
}
