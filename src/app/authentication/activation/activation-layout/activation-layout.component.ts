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
  userId: string;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params =>{
      this.userId = params.userId;
      this.authService.unlock(this.userId).subscribe((response)=>{
        this.router.navigate(['login']);
      })
    })
  }

}
