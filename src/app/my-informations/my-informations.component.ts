import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {SecuredInformationPostRequest} from '../shared/interfaces/requests/secured-information-post.request';
import {SecuredInformationService} from '../shared/services/secured-information/secured-information.service';
import { AuthenticationService } from '../shared/services/authentication.service';

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
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService,
    private securedInfoService: SecuredInformationService,
    private authenticationSerivce: AuthenticationService) {
      this.securedInfoForm = this.fb.group({
        name: [null, [Validators.required]],
        information: [null, [Validators.required]],
        sendEmail: [null, [Validators.required, Validators.email]],
        sendDateTime: [null,[Validators.required]]
      });
    }

  submitForm(): void {
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
    this.authenticationSerivce.currentUser.subscribe(user =>{
      this.userId = user.userId;
    })
    this.translateService.get("MY_INFORMATION").subscribe((translations) =>{
      this.MY_INFORMATION = translations;
    })
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
