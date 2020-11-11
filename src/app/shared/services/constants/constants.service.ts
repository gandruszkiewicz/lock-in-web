import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  public apiBaseUrl: string ="http://lockin-dev.us-west-2.elasticbeanstalk.com/api/v1";
  constructor() { }
}
