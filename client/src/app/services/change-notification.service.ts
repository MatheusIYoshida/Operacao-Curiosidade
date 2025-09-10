import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeNotificationService {
  private readonly reloadInfos$ = new Subject<boolean>();
  
  valueChanged(){
    return this.reloadInfos$.asObservable();
  }

  emitValue(bool: boolean){
    this.reloadInfos$.next(bool)
  }
}
