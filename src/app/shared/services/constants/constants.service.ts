import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  public apiBaseUrl: string ="https://localhost:44365/api/v1";
  constructor() { }
}
