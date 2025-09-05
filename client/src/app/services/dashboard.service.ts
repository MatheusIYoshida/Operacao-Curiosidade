import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _http: HttpClient, private _lsService: LocalStorageService) { }

  get(apiUrl: string){
    const token = this._lsService.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `bearer ${token}` 
    });

    return this._http.get(apiUrl, {headers});
  }
}
