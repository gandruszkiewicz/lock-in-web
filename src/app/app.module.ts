import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
	
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';

import { registerLocaleData, PathLocationStrategy, LocationStrategy } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS,} from '@angular/common/http';
import {JwtInterceptor} from './shared/interceptor/token.interceptor';

import { NgChartjsModule } from 'ng-chartjs';
import { ThemeConstantService } from './shared/services/theme-constant.service';
import {AuthenticationModule} from './authentication/authentication.module';
import { MyInformationsComponent } from './my-informations/my-informations.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { MyInformationsBlockedLayoutComponent } from './my-informations-blocked/layout/my-informations-blocked-layout/my-informations-blocked-layout.component';
import { MyInformationsBlockedActionComponent } from './my-informations-blocked/blocked-action/my-informations-blocked-action/my-informations-blocked-action.component';
import { Login3Component } from './authentication/login-3/login-3.component';

registerLocaleData(en);

export function HttpLoaderFactory(http: HttpClient){
    return new TranslateHttpLoader(http);
}

const antdModule= [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzToolTipModule,
    NzGridModule,
    NzProgressModule,
    NzModalModule,
    NzNotificationModule
]

@NgModule({
    declarations: [
        AppComponent,
        CommonLayoutComponent,
        MyInformationsComponent,
        MyInformationsBlockedLayoutComponent,
        MyInformationsBlockedActionComponent,
        Login3Component
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NzBreadCrumbModule,
        TemplateModule,
        SharedModule,
        NgChartjsModule,
        FormsModule,
        ReactiveFormsModule,
        ...antdModule,
        AuthenticationModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader:{
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        { 
            provide: NZ_I18N,
            useValue: en_US, 
        },
        {
            provide: LocationStrategy, 
            useClass: PathLocationStrategy
        },
        ThemeConstantService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
