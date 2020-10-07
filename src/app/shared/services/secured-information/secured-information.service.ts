import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../constants/constants.service';
import { Observable, BehaviorSubject } from 'rxjs';
import {SecuredInformationPostRequest} from '../../interfaces/requests/secured-information-post.request'
import {SecuredInformationResponse} from '../../interfaces/responses/secured-information-response.type'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SecuredInformationService {
  serviceBaseUrl: string;
  private securedInfosSubject: BehaviorSubject<SecuredInformationResponse[]>;
  public securedInfos: Observable<SecuredInformationResponse[]>;

  private selectedSecuredInfoSubject: BehaviorSubject<SecuredInformationResponse>;
  public selectedSecuredInfo: Observable<SecuredInformationResponse>;

  constructor(private http: HttpClient, private constants: ConstantsService) {
    this.serviceBaseUrl = `${constants.apiBaseUrl}/SecuredInformation`;
    
    this.securedInfosSubject = new BehaviorSubject<SecuredInformationResponse[]>(null);
    this.securedInfos = this.securedInfosSubject.asObservable();

    this.selectedSecuredInfoSubject = new BehaviorSubject<SecuredInformationResponse>(null);
    this.selectedSecuredInfo = this.selectedSecuredInfoSubject.asObservable();
   }

  public passSelectedSecuredInfo(securedInfo: SecuredInformationResponse){
    this.selectedSecuredInfoSubject.next(securedInfo);
  }

  public post(securedInformation: SecuredInformationPostRequest): Observable<any>{
    return this.http.post(this.serviceBaseUrl,securedInformation);
  }

  public getByUser(userId): Observable<SecuredInformationResponse[]>{
    return this.http.get<SecuredInformationResponse[]>(this.serviceBaseUrl+`/${userId}`)
    .pipe(map(securedInfos => {
      if(securedInfos){
        this.securedInfosSubject.next(securedInfos);
      }
      return securedInfos;
    }))
  }
}
