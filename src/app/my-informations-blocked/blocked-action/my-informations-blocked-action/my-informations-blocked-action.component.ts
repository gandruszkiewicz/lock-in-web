import { Component, OnInit, Input } from '@angular/core';
import { SecuredInformationService } from 'src/app/shared/services/secured-information/secured-information.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { ConfigService } from '../../../shared/services/config.service'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-informations-blocked-action',
  templateUrl: './my-informations-blocked-action.component.html',
  styleUrls: ['./my-informations-blocked-action.component.css']
})
export class MyInformationsBlockedActionComponent implements OnInit {

  @Input()
  securedInfoId: number;
  userId: string
  isAssigned: boolean;
  GENERAL: any
  constructor(
    private translateService: TranslateService,
    private securedInfoService: SecuredInformationService,
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessagesService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.translateService.get("GENERAL").subscribe((translations)=>{
      this.GENERAL = translations;
    })
    this.authService.currentUser.subscribe(user =>{
      if(user){
        this.securedInfoService.isAssignedToUser(user.userId, this.securedInfoId)
        .subscribe(isAssigned =>{
          this.isAssigned = isAssigned;
        })
      }      
    })
  }

  onTurnOff():void{
    this.configService.startProgress();
    this.securedInfoService.delete(this.securedInfoId).subscribe(response =>{
      this.configService.stopProgress();
      this.messageService.message = {
        isError: false,
        content: 'Secure information has been turned off.'
      }
      this.router.navigate([''])
    })
  }

}
