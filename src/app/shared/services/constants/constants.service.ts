import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  public apiBaseUrl: string ="http://localhost:4200/api/v1";
  constructor() { }
}
