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
  private securedInfosSubject: BehaviorSubject<SecuredInformationResponse[]>;
  public securedInfos: Observable<SecuredInformationResponse[]>;

  private selectedSecuredInfoSubject: BehaviorSubject<SecuredInformationResponse>;
  public selectedSecuredInfo: Observable<SecuredInformationResponse>;

  constructor(private http: HttpClient, private constants: ConstantsService, private authService: AuthenticationService) {
    this.serviceBaseUrl = `${constants.apiBaseUrl}/SecuredInformation`;
    
    this.securedInfosSubject = new BehaviorSubject<SecuredInformationResponse[]>(null);
    this.securedInfos = this.securedInfosSubject.asObservable();

    this.selectedSecuredInfoSubject = new BehaviorSubject<SecuredInformationResponse>(null);
    this.selectedSecuredInfo = this.selectedSecuredInfoSubject.asObservable();
    this.authService.currentUser.subscribe(user => {
      if(user){
        this.getByUser(user.userId).subscribe(data =>{
          this.securedInfosSubject.next(data);
        })
      }
    })
   }

  public passSelectedSecuredInfo(securedInfo: SecuredInformationResponse){
    this.selectedSecuredInfoSubject.next(securedInfo);
  }

  public passNextData(securedInfo: SecuredInformationResponse[]){
    this.securedInfosSubject.next(securedInfo);
    this.securedInfosSubject.complete();
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
