import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  constructor(private _http: HttpClient, private _lsService: LocalStorageService) { }

  getProfile(email: string){
    const token = this._lsService.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `bearer ${token}` 
    });

    return this._http.get(`https://localhost:7160/api/Profile/by-email/${email}`, {headers});
  }

  updateProfile(profile: any, currentEmail: any){
    const currentProfile = this._lsService.getItem('currentProfile');
    const token = this._lsService.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `bearer ${token}` 
    });

    return this._http.put(`https://localhost:7160/api/Profile/by-email/${currentEmail}/${currentProfile.name}/${currentProfile.email}`, profile, {headers})
  }
}
