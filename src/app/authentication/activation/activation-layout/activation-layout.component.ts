import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-activation-layout',
  templateUrl: './activation-layout.component.html',
  styleUrls: ['./activation-layout.component.css']
})
export class ActivationLayoutComponent implements OnInit {
  isAuthenticated: boolean;
  userId: string;
  ACCOUNT_ACTIVATION: any;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private translateService: TranslateService,
    private activateRoute: ActivatedRoute,
    private messageService: MessagesService) { }

  ngOnInit(): void {
    this.translateService.get("ACCOUNT_ACTIVATION").subscribe((translations) =>{
      this.ACCOUNT_ACTIVATION = translations;

      this.activateRoute.params.subscribe(params =>{
        this.userId = params.userId;
        this.authService.unlock(this.userId).subscribe((response)=>{
          this.messageService.message = {
            isError: false,
            content: this.ACCOUNT_ACTIVATION.SUCCESS
          }
          this.router.navigate(['login']);
        })
      })
    })
  }

}
