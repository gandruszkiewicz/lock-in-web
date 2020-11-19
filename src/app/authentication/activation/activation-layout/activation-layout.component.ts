import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-activation-layout',
  templateUrl: './activation-layout.component.html',
  styleUrls: ['./activation-layout.component.css']
})
export class ActivationLayoutComponent implements OnInit {
  isAuthenticated: boolean;
  securedInfoId: number;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user =>{
      if(user?.token){
        this.isAuthenticated = true;
        this.activateRoute.params.subscribe(params =>{
          this.securedInfoId = Number(params.id);
        })
      }else{
        this.isAuthenticated = false;
      }
  })
  }

}
