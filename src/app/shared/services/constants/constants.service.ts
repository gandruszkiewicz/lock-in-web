import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  public apiBaseUrl: string ="https://localhost:443/api/v1";
  constructor() { }
}
