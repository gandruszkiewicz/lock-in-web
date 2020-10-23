import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../constants/constants.service';
import { Observable, BehaviorSubject } from 'rxjs';
import {SecuredInformationPostRequest, SecuredInformationPutRequest} from '../../interfaces/requests/secured-information-post.request'
import {SecuredInformationResponse} from '../../interfaces/responses/secured-information-response.type'
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SecuredInformationService {
  serviceBaseUrl: string;

  constructor(
    private http: HttpClient,
    private constants: ConstantsService) {
    this.serviceBaseUrl = `${constants.apiBaseUrl}/SecuredInformation`;
  }


   public getByUser(userId): Observable<SecuredInformationResponse[]>{
    return this.http.get<SecuredInformationResponse[]>(this.serviceBaseUrl+`/${userId}`);
  }
  public post(securedInformation: SecuredInformationPostRequest): Observable<any>{
    return this.http.post(this.serviceBaseUrl,securedInformation);
  }

  public put(securedInformation: SecuredInformationPutRequest): Observable<any>{
    return this.http.put(this.serviceBaseUrl,securedInformation);
  }
  public delete(securedInfoId: number): Observable<any>{
    return this.http.delete(`${this.serviceBaseUrl}/${securedInfoId}`)
  }

  public isAssignedToUser(userId: string, securedInfoId: number): Observable<boolean>{
    return this.http.get<boolean>(`${this.serviceBaseUrl}/${userId}/${securedInfoId}`);
  }
}
