import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-informations-blocked-action',
  templateUrl: './my-informations-blocked-action.component.html',
  styleUrls: ['./my-informations-blocked-action.component.css']
})
export class MyInformationsBlockedActionComponent implements OnInit {

  @Input()
  securedInfoId: number;
  constructor() { }

  ngOnInit(): void {
  }

}
