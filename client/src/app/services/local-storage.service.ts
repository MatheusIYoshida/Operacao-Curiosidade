import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getItem(item: string){
    const stored = localStorage.getItem(item);
    if(stored){
      return JSON.parse(stored);
    }else{
      return null;
    }
  }
}