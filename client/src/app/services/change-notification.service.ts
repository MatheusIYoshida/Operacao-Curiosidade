import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeNotificationService {
  private readonly reloadInfos$ = new Subject<string | null>();
  
  valueChanged(){
    return this.reloadInfos$.asObservable();
  }

  emitValue(filter: string | null){
    this.reloadInfos$.next(filter)
  }
}
