import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { InvitationStatus, InvitedUser, User } from '../models';

@Injectable({
    providedIn: 'root'
})
export class InviteService {
    private readonly url = 'http://localhost:3000/users';

    constructor(private http: HttpClient) {}

    get(): Observable<User[]> {
        return this.http.get<User[]>(this.url);
    }

    invite(user: User): Observable<InvitedUser> {
        return this.http.post<InvitedUser>(this.url, user).pipe(
            map((invitedUser: User) => ({...invitedUser, status: `User: ${user.email} has been successfully invited`})),
            catchError(error => this.handleErrorRequest(error, user)));
    }

    private handleErrorRequest(errorResponse: Error | HttpErrorResponse, user: User): Observable<InvitedUser> {
        if (errorResponse instanceof HttpErrorResponse) {
            if (errorResponse.status === InvitationStatus.USER_EXISTS) {
                return of({...user, status: `User: ${user.email} is already exist`});
            } else if (errorResponse.status === InvitationStatus.USER_CANT_BE_ADDED) {
                return of({...user, status: `User: ${user.email} cannot be added. Internal Error`});
            }
        }
        return of({...user, status: `User: ${user.email} cannot be added. Unknown reason`});
    }
}

