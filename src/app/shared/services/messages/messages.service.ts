import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private _message = new BehaviorSubject<Message>(null);
  public message$ = this._message.asObservable();

  constructor(private messageService: NzMessageService) { }

  public get message(): Message{
    return this._message.getValue();
  }

  public set message(val: Message){
    this._message.next(val);
  }
}


export interface Message{
  isError: boolean;
  content: string
}
