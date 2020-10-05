import { Component } from '@angular/core'
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import {AuthenticationService} from '../../shared/services/authentication.service'
import { Router } from '@angular/router';
import { UserLoginRequest } from 'src/app/models/requests/user-login.request';
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: './login-3.component.html'
})

export class Login3Component {
    loginForm: FormGroup;
    AUTHENTICATION: any;
    GENERAL: any

    constructor(private fb: FormBuilder,              
        private authService: AuthenticationService,
        private router: Router,
        private translateService: TranslateService) {
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
          if(response.token){
            localStorage.setItem('token',response.token);
            localStorage.setItem('userId', response.userId);
            this.router.navigate(['/']);
          }
        })
      }
    
}    