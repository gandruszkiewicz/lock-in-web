import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { UserRegisterRequest } from 'src/app/models/requests/user-register-request';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ConfigService } from 'src/app/shared/services/config.service';
import { Subscription } from 'rxjs';


@Component({
    templateUrl: './sign-up-3.component.html'
})

export class SignUp3Component {

    signUpForm: FormGroup;
    AUTHENTICATION: any;
    GENERAL: any;
    token: string;
    progressSub: Subscription;

    constructor(private fb: FormBuilder,
        private authService: AuthenticationService,
        private router: Router,
        private translateService: TranslateService,
        private configService: ConfigService) {
    }

    submitForm(): void {
        for (const i in this.signUpForm.controls) {
            this.signUpForm.controls[ i ].markAsDirty();
            this.signUpForm.controls[ i ].updateValueAndValidity();
        }

        const {value} = this.signUpForm;
        let reqParams= new UserRegisterRequest(
            value.email,
            value.password
        )
        this.authService.register(reqParams).subscribe(response => {
            this.token = response.token;
            
        },(error)=>{
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

    onSignUp(){
        this.configService.startProgress();
    }

    updateConfirmValidator(): void {
        Promise.resolve().then(() => this.signUpForm.controls.checkPassword.updateValueAndValidity());
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.signUpForm.controls.password.value) {
            return { confirm: true, error: true };
        }
    }

    ngOnInit(): void {
        this.translateService.get("AUTHENTICATION").subscribe((translations) =>{
            this.AUTHENTICATION = translations;
          })
          this.translateService.get("GENERAL").subscribe((translations)=>{
            this.GENERAL = translations;
          })
        this.signUpForm = this.fb.group({
            // userName         : [ null, [ Validators.required ] ],
            email            : [ null, [ Validators.required ] ],
            password         : [ null, [ Validators.required ] ],
            checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
            agree            : [ false ]
        });
    }
}    