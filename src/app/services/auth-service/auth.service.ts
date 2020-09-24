import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLoginRequest } from '../../models/requests/user-login.request';
import { UserLoginResponse } from '../../models/responses/user-login.response';
import {ConstantsService} from '../constants.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private constants: ConstantsService) { }

  public login(reqParams: UserLoginRequest): Observable<UserLoginResponse>{
    return this.http.post<UserLoginResponse>(this.constants.apiBaseUrl+'identity/login',reqParams)
  }
}
