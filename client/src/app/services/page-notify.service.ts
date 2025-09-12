import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageNotifyService {
  private readonly pageNotify$ = new Subject<number>();
  
  valueChanged(){
    return this.pageNotify$.asObservable();
  }

  emitValue(currentPage: number){
    this.pageNotify$.next(currentPage)
  }
}
