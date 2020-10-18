import { Injectable } from '@angular/core';
import { ProgressHttp } from '../interfaces/progress-http.type'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly _progressHttp = new BehaviorSubject<ProgressHttp>({
    IsVisible: false,
    Percentage: 0,
    source: '',
    isError: false
  });
  readonly progressHttp$ = this._progressHttp.asObservable();

  constructor() { }


  public get progressHttp(): ProgressHttp {
    return this._progressHttp.getValue();
  }

  public set progressHttp(val: ProgressHttp) {
    this._progressHttp.next(val);
  }

  private isStartProgress : boolean = false;
  private isStartStopProgress: boolean = false;
  private isStartFailedProgress: boolean = false;

  public startProgress(){
    this.isStartProgress = true

    let interval = setInterval(() =>{
      if(!this.isStartProgress){
        clearInterval(interval);
      }else{
        let currentVal = this.progressHttp.Percentage
        if(currentVal === 70){
          clearInterval(interval)
        }else{
          this.progressHttp = {
            IsVisible: true,
            Percentage: currentVal + 10,
            source: 'startProgress',
            isError: false
          }
        }
      }
    },200)
  }

  public stopProgress(){
    this.isStartStopProgress = true;
    this.isStartProgress = false
    this.isStartFailedProgress = false

    let interval = setInterval(() =>{
      if(!this.isStartStopProgress){
        clearInterval(interval);
      }else{
        let currentVal = this.progressHttp.Percentage
        if(currentVal === 120){
          this.setDefaultData();
          clearInterval(interval)
        }else{
          this.progressHttp = {
            IsVisible: true,
            Percentage: currentVal + 10,
            source: 'stopProgress',
            isError: false
          }
        }
      }
    },100)
  }

  public faliedProgress(){
    this.isStartFailedProgress = true
    this.isStartProgress = false
    this.isStartStopProgress = false;
    let interval = setInterval(() =>{
      const errorInterval = this.progressHttp.errorInterval 
      ? this.progressHttp.errorInterval
      : 0;  
      if(!this.isStartFailedProgress){
        clearInterval(interval);
      }else{
        if(errorInterval === 30){
          this.setDefaultData();
          clearInterval(interval);
        }else{
          let currentVal = this.progressHttp.Percentage
          this.progressHttp = {
            IsVisible: true,
            Percentage: currentVal,
            source: 'faliedProgress',
            isError: true,
            errorInterval: errorInterval + 10
          }
        }
      }
    },100)
  }

  private setDefaultData(){
    this.progressHttp = {
      IsVisible : false,
      Percentage: 0,
      source: 'setDefaultData',
      isError: false
    }
  }
}
