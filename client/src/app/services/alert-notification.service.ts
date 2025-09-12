import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertNotificationService {
  private readonly notification$ = new Subject<string>();
  
  valueChanged(){
    return this.notification$.asObservable();
  }

  emitValue(message: string){
    this.notification$.next(message)
  }
}
