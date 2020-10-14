import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './shared/services/config.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    isVisible: boolean = false;
    Percentage: number = 0;
    constructor(
        public translate: TranslateService,
        private configService: ConfigService,
        private modal: NzModalService){
        translate.addLangs(['en', 'pl']);
        translate.setDefaultLang('en');
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|pl/) ? browserLang : 'en')
    }
    ngOnInit(){
        this.configService.progressHttp$.subscribe(progressHttp =>{
            console.log(progressHttp);
            this.isVisible = progressHttp.IsVisible;
            this.Percentage = progressHttp.Percentage;
        })
    }
}
