import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7160/api/Auth/Login';

  constructor(private readonly http: HttpClient) { }

  login(Email: string, Password: string){
    return this.http.post(this.apiUrl, {Email, Password})
  };
}
