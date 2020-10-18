import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './shared/services/config.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MessagesService, Message } from './shared/services/messages/messages.service'
import { NzNotificationService, NzNotificationDataOptions } from 'ng-zorro-antd/notification';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    isVisible: boolean = false;
    Percentage: number = 0;
    isErrorHttp: boolean;
    constructor(
        public translate: TranslateService,
        private configService: ConfigService,
        private modal: NzModalService,
        private messageService: MessagesService,
        private notification: NzNotificationService){
        translate.addLangs(['en', 'pl']);
        translate.setDefaultLang('en');
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|pl/) ? browserLang : 'en')
    }
    ngOnInit(){
        this.configService.progressHttp$.subscribe(progressHttp =>{
            this.isVisible = progressHttp.IsVisible;
            this.Percentage = progressHttp.Percentage;
            this.isErrorHttp = progressHttp.isError;
        })
        this.messageService.message$.subscribe(message =>{
            this.sendNotification(message)
        })
    }

    sendNotification(message: Message): void{
        if(!message){
            return;
        }
        const {content} = message;
        const {isError} = message;
        const options : NzNotificationDataOptions = {
            nzDuration: 10000
        };
        if(isError){
          this.notification.error("Error",content, options);
        }else if(!isError){
          this.notification.success("Success",content, options)
        }
        
      };
}
