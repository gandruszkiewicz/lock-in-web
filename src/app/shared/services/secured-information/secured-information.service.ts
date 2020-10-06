import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../constants/constants.service';
import { Observable } from 'rxjs';
import {SecuredInformationPostRequest} from '../../interfaces/requests/secured-information-post.request'

@Injectable({
  providedIn: 'root'
})
export class SecuredInformationService {
  serviceBaseUrl: string;
  constructor(private http: HttpClient, private constants: ConstantsService) {
    this.serviceBaseUrl = `${constants.apiBaseUrl}/SecuredInformation`
   }

  public post(securedInformation: SecuredInformationPostRequest): Observable<any>{
    return this.http.post(this.serviceBaseUrl,securedInformation);
  }

  public getByUser(userId): Observable<any>{
    return this.http.get(this.serviceBaseUrl+`/${userId}`);
  }
}
