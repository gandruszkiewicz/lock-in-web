import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {SecuredInformationPostRequest} from '../shared/interfaces/requests/secured-information-post.request';
import {SecuredInformationService} from '../shared/services/secured-information/secured-information.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SecuredInformationResponse } from '../shared/interfaces/responses/secured-information-response.type';
import { SecuredInformationStoreService } from '../shared/services/secured-information/secured-information-store.service';

@Component({
  selector: 'app-my-informations',
  templateUrl: './my-informations.component.html',
  styleUrls: ['./my-informations.component.css']
})
export class MyInformationsComponent implements OnInit {

  securedInfoForm: FormGroup
  textValue: string;
  isDisabled: boolean = true;
  MY_INFORMATION: any;
  userId: string;
  isEditForm: boolean;
  securedInfo: SecuredInformationResponse;
  @Output()
  securedInfoChanged: EventEmitter<Event> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService,
    private securedInfoService: SecuredInformationService,
    private authenticationSerivce: AuthenticationService,
    private securedInfoStore: SecuredInformationStoreService,
    private router: ActivatedRoute) {
      this.isEditForm =  window.location.href.includes('edit')
      this.securedInfoForm = this.fb.group({
        name: [null, [Validators.required]],
        information: [null, [Validators.required]],
        sendEmail: [null, [Validators.required, Validators.email]],
        sendDateTime: [null,[Validators.required]]
      });
    }

  submitForm(event: any): void {
    for (const i in this.securedInfoForm.controls) {
      this.securedInfoForm.controls[i].markAsDirty();
      this.securedInfoForm.controls[i].updateValueAndValidity();
    }
    const {value} = this.securedInfoForm;
    let postReq: SecuredInformationPostRequest = {
      Information: value.information,
      Name : value.name,
      SendEmail: value.sendEmail,
      SendDateTime : value.sendDateTime,
      UserId: this.userId,
      IsBlocked: false
    }
    this.securedInfoService.post(postReq).subscribe(response =>{
      this.securedInfoStore.loadData();
    },null, () =>{
      this.securedInfoForm = this.fb.group({
        name: [this.changeFormValueToStars(value.name), [Validators.required]],
        information: [this.changeFormValueToStars(value.information), [Validators.required]],
        sendEmail: [this.changeFormValueToStars(value.sendEmail), [Validators.required, Validators.email]],
        sendDateTime: [null,[Validators.required]]
      })
      this.isDisabled = false;
    });
  }


  changeFormValueToStars(value: string): string{
    let starValue: string ='';

    for(let index = 0; index <= value?.length; index++){
      starValue += '*';
    }
    return starValue;
  }

  ngOnInit(): void {
    if(this.isEditForm){
      this.isDisabled = false;
      this.securedInfoService.selectedSecuredInfo.subscribe(securedInfo =>{
        this.securedInfo = securedInfo;
        this.securedInfoForm = this.fb.group({
          name: [securedInfo.name, [Validators.required]],
          information: [securedInfo.information, [Validators.required]],
          sendEmail: [securedInfo.sendEmail, [Validators.required, Validators.email]],
          sendDateTime: [securedInfo.sendDateTime,[Validators.required]]
        });
      })
    }
    this.authenticationSerivce.currentUser.subscribe(user =>{
      this.userId = user.userId;
    })
    this.translateService.get("MY_INFORMATION").subscribe((translations) =>{
      this.MY_INFORMATION = translations;
    })
  }

  onDelete(){
    this.securedInfoService.delete(this.securedInfo.id);
  }
  sendDateClick(){
    this.cdr.detectChanges();
  }

  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date): void {
    console.log('onOk', result);
  }
}
