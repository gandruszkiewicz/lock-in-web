import { Component } from '@angular/core'
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import {AuthService} from '../../services/auth-service/auth.service'
import { Router } from '@angular/router';
import { UserLoginRequest } from 'src/app/models/requests/user-login.request';


@Component({
    templateUrl: './login-3.component.html'
})

export class Login3Component {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder,              
        private authService: AuthService,
        private router: Router) {
    }

    ngOnInit(): void {
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
    
        console.log(this.loginForm)
    
        let reqParams : UserLoginRequest = {
          email : this.loginForm.value.userName,
          password : this.loginForm.value.password
        }
        this.authService.login(reqParams).subscribe(response => {
          if(response.token){
            localStorage.setItem('token',response.token);
            localStorage.setItem('userId', response.userId);
            this.router.navigate(['/']);
          }
        })
      }
    
}    