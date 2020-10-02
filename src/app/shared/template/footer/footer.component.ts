import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})

export class FooterComponent  implements OnInit{
    FOOTER: any;
    constructor(private translateService: TranslateService){}

    ngOnInit(){
        this.translateService.get("FOOTER").subscribe((translations) =>{
            this.FOOTER = translations;
          })
    }
}
