import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateLog } from './Interfaces/create-log.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateProfileService {
  private currentProfile: ICreateLog | null = null;
  private newLog: ICreateLog | null = null;

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const stored = localStorage.getItem('currentProfile');
    if(stored){
      this.currentProfile = JSON.parse(stored);
    }else{
      this.currentProfile = null;
    }
  }

  create(Name: string, Email: string, Password: string){
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

    return this.http.post(`https://localhost:7160/api/Profile?nameCreate=${this.newLog.Name}&emailCreate=${this.newLog.Email}`, {Name, Email, Password})
  }
}
