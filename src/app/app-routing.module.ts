import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { CommonLayoutComponent } from "./layouts/common-layout/common-layout.component";
import { CommonLayout_ROUTES } from "./shared/routes/common-layout.routes";
import { Login3Component } from './authentication/login-3/login-3.component';

const appRoutes: Routes = [
    { 
        path: '', 
        component: CommonLayoutComponent,
        children: CommonLayout_ROUTES 
    },
    {
        path:'login',
        component: Login3Component
    }
    
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { 
            preloadingStrategy: PreloadAllModules,
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled' 
        })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}