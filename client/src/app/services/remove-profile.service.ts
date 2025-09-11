import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RemoveProfileService {

  constructor(
    private readonly _lsService: LocalStorageService,
    private readonly _http: HttpClient
  ) { }

  delete(currentProfile: any, emailToRemove: string){
    const token = this._lsService.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `bearer ${token}` 
    });
    
    return this._http.delete(`https://localhost:7160/api/Profile/by-email/${emailToRemove}/${currentProfile.name}/${currentProfile.email}`, {headers});
  }
}
