import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ThemeConstantService } from './services/theme-constant.service';
import { SearchPipe } from './pipes/search.pipe';
import { AuthenticationService } from './services/authentication.service';
import { SecuredInformationService } from './services/secured-information/secured-information.service';
import { SecuredInformationStoreService } from './services/secured-information/secured-information-store.service';
import { NzMessageModule } from 'ng-zorro-antd/message';


@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        HttpClientJsonpModule,
        NzIconModule,
        PerfectScrollbarModule,
        SearchPipe,
        NzMessageModule
    ],
    imports: [
        RouterModule,
        CommonModule,
        NzIconModule,
        NzToolTipModule,
        PerfectScrollbarModule
    ],
    declarations: [
        SearchPipe
    ],
    providers: [
        ThemeConstantService,
        AuthenticationService,
        SecuredInformationService

    ]
})

export class SharedModule { }
