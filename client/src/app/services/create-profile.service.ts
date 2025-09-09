import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateLog } from './Interfaces/create-log.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CreateProfileService {
  private currentProfile: ICreateLog | null = null;
  private newLog: ICreateLog | null = null;

  constructor(private readonly _http: HttpClient, private readonly _lsService: LocalStorageService) {}

  create(Name: string, Email: string, Password: string){
    this.currentProfile = this._lsService.getItem('currentProfile')
    if(this.currentProfile === null){
      this.newLog = {
        Name: Name,
        Email: Email
      }
    }else{
      this.newLog = {
        Name: this.currentProfile.Name,
        Email: this.currentProfile.Email
      }
    }

    return this._http.post(`https://localhost:7160/api/Profile?nameCreate=${this.newLog.Name}&emailCreate=${this.newLog.Email}`, {Name, Email, Password})
  }
}
