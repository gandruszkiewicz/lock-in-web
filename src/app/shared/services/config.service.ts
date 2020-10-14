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
    source: ''
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
            source: 'startProgress'
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
            source: 'stopProgress'
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
      if(!this.isStartFailedProgress){
        clearInterval(interval);
      }else{
        let currentVal = this.progressHttp.Percentage
        if(currentVal === 0){
          this.setDefaultData();
          clearInterval(interval)
        }else{
          this.progressHttp = {
            IsVisible: true,
            Percentage: currentVal - 10,
            source: 'faliedProgress'
          }
        }
      }
    },20)
  }

  private setDefaultData(){
    this.progressHttp = {
      IsVisible : false,
      Percentage: 0,
      source: 'setDefaultData'
    }
  }
}
