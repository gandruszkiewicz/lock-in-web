import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login3Component } from './login-3/login-3.component';

import { SignUp3Component } from './sign-up-3/sign-up-3.component';
import { Error1Component } from './error-1/error-1.component';
import { Error2Component } from './error-2/error-2.component';

const routes: Routes = [
    {
        path: 'login-3',
        component: Login3Component,
        data: {
            title: 'Login 3'
        }
    },
    {
        path: 'sign-up-3',
        component: SignUp3Component,
        data: {
            title: 'Sign Up 2'
        }
    },
    {
        path: 'error-1',
        component: Error1Component,
        data: {
            title: 'Error 1'
        }
    },
    {
        path: 'error-2',
        component: Error2Component,
        data: {
            title: 'Error 2'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
