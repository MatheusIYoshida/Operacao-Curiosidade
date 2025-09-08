import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  constructor(private _http: HttpClient, private _lsService: LocalStorageService) { }

  getProfile(){
    const currentProfile = this._lsService.getItem('currentProfile');
    const email = currentProfile.email;
    const token = this._lsService.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `bearer ${token}` 
    });

    return this._http.get(`https://localhost:7160/api/Profile/by-email/${email}`, {headers});
  }
}
