import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private readonly _http: HttpClient, private readonly _lsService: LocalStorageService) {}
  
  getAllProfiles(){
    const token = this._lsService.getItem('token');
    const headers = new HttpHeaders({
          'Authorization': `bearer ${token}` 
        });

    return this._http.get('https://localhost:7160/api/Profile', {headers});
  }
}
