import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateLog } from './Interfaces/create-log.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CreateProfileService {
  private currentProfile: any | null = null;
  private newLog: ICreateLog | null = null;

  constructor(private readonly _http: HttpClient, private readonly _lsService: LocalStorageService) {}

  create(newProfile: any){
    this.currentProfile = this._lsService.getItem('currentProfile');
    if(this.currentProfile === null){
      this.newLog = {
        Name: newProfile.Name,
        Email: newProfile.Email
      };
    }else{
      this.newLog = {
        Name: this.currentProfile.name,
        Email: this.currentProfile.email
      };
    }
    console.log(newProfile);
    return this._http.post(`https://localhost:7160/api/Profile?nameCreate=${this.newLog.Name}&emailCreate=${this.newLog.Email}`, newProfile);
  }
}
