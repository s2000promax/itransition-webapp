import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { Users } from '@config/types/user/user.interface';
import { BodyRequestInterface } from '@config/types/auth/credentails.type';
import { AuthService } from '@services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private usersSubject = new BehaviorSubject<Users>([]);
    private users$: Observable<Users> = this.usersSubject.asObservable();

    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {}

    get getUsers(): Observable<Users> {
        return this.users$;
    }

    fetchAll(): Observable<Users> {
        return this.http.get<Users>(environment.apiUrl + '/user').pipe(
            tap((users) => {
                this.usersSubject.next(users);
            }),
        );
    }

    update(users: Users, status: boolean) {
        const body: Partial<BodyRequestInterface> = {
            ids: this.getIds(users),
            status: status,
        };

        return this.invokeMethodPut(body).pipe(
            switchMap(() => this.fetchAll()),
        );
    }

    delete(users: Users) {
        const body: Partial<BodyRequestInterface> = {
            ids: this.getIds(users),
            delete: true,
        };

        return this.invokeMethodPut(body).pipe(
            switchMap(() => {
                if (!body.ids?.includes(this.authService.getOwnId)) {
                    return this.fetchAll();
                } else {
                    this.authService.logout().subscribe();
                    return of(null);
                }
            }),
        );
    }

    private invokeMethodPut(body: Partial<BodyRequestInterface>) {
        return this.http.put(environment.apiUrl + `/user`, body);
    }

    private getIds(users: Users): string[] {
        return users.map((user) => user.id!);
    }
}
