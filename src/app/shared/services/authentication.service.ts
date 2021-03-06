import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ConstantsService} from './constants/constants.service'

import { User } from '../interfaces/user.type';
import { UserRegisterRequest } from 'src/app/models/requests/user-register-request';
import { UserRegisterResponse } from 'src/app/models/responses/user-register.response';


@Injectable()
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private serviceBaseUrl;
    constructor(private http: HttpClient, private constants: ConstantsService) {
        this.serviceBaseUrl = `${constants.apiBaseUrl}/identity`
        this.currentUserSubject = new BehaviorSubject<User>(null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(this.serviceBaseUrl+'/login', { email, password })
        .pipe(map(user => {
            if (user && user.token) {
                //localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return user;
        }));
    }

    public register(reqParams: UserRegisterRequest): Observable<UserRegisterResponse>{
        return this.http.post<UserRegisterResponse>(this.serviceBaseUrl+'/register',reqParams)
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}