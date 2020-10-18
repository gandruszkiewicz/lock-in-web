import { Component } from '@angular/core'
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import {AuthenticationService} from '../../shared/services/authentication.service'
import { Router } from '@angular/router';
import { UserLoginRequest } from 'src/app/models/requests/user-login.request';
import {TranslateService} from '@ngx-translate/core';
import { ConfigService } from '../../shared/services/config.service'
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessagesService, Message } from 'src/app/shared/services/messages/messages.service';

@Component({
    templateUrl: './login-3.component.html'
})

export class Login3Component {
    loginForm: FormGroup;
    AUTHENTICATION: any;
    GENERAL: any
    token: string;
    progressSub: Subscription;

    constructor(private fb: FormBuilder,              
        private authService: AuthenticationService,
        private router: Router,
        private translateService: TranslateService,
        private configService: ConfigService,
        private messageService: MessagesService) {
    }

    ngOnInit(): void {
      this.translateService.get("AUTHENTICATION").subscribe((translations) =>{
        this.AUTHENTICATION = translations;
      })
      this.translateService.get("GENERAL").subscribe((translations)=>{
        this.GENERAL = translations;
      })
        this.loginForm = this.fb.group({
            userName: [ null, [ Validators.required ] ],
            password: [ null, [ Validators.required ] ]
        });
    }
    
    submitForm(): void {
      
        for (const i in this.loginForm.controls) {
          this.loginForm.controls[i].markAsDirty();
          this.loginForm.controls[i].updateValueAndValidity();
        }
    
        let reqParams : UserLoginRequest = {
          email : this.loginForm.value.userName,
          password : this.loginForm.value.password
        }        
        this.authService.login(reqParams.email, reqParams.password).subscribe(response => {
          this.token = response.token;
        },(error : HttpErrorResponse)=>{
          this.messageService.message = this.processErrorMessage(error);
          this.configService.faliedProgress();
          this.onSubmitFinish(true)
        },()=>{
          this.configService.stopProgress();
          this.onSubmitFinish(false)
        })
    }

    onSubmitFinish(isError: boolean){
      if(this.token){
        this.progressSub = this.configService.progressHttp$.subscribe(progress =>{
          if(!progress.IsVisible && !isError){
            this.router.navigate(['/']);
          }
        });
      }
    }
    onSignIn(){
      this.configService.startProgress();
    }


    processErrorMessage(error: HttpErrorResponse): Message{
      let message: Message = {
        isError: true,
        content: ''
      }
      switch(error.status){
        case 404:
          message.content = "User dosen't exist";
          break;
        case 422:
          message.content = "Wrong password";
        default:
          message.content = "Error occur";
          break;
      }
      return message
    }

}