import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SecuredInformationResponse } from '../../interfaces/responses/secured-information-response.type';
import { SecuredInformationService } from './secured-information.service';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SecuredInformationStoreService {
  private readonly _secureInformations = new BehaviorSubject<Array<SecuredInformationResponse>>([]);
  readonly secureInformations$ = this._secureInformations.asObservable();
  constructor(
    private secureInfoService: SecuredInformationService, 
    private authService: AuthenticationService) 
  { 

  }

  loadData(){
    if(this.authService.currentUserValue){
      this.secureInfoService.getByUser(this.authService.currentUserValue.userId)
      .subscribe(response =>{
        this.securedInfos = response;
      })
    }
  }

  public get securedInfos(): SecuredInformationResponse[] {
    return this._secureInformations.getValue();
  }

  public set securedInfos(val: SecuredInformationResponse[]) {
    this._secureInformations.next(val);
  }
}
