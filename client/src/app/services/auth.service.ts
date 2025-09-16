import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7160/api/Auth/Login';

  constructor(
    private readonly _http: HttpClient,
    private readonly _lsService: LocalStorageService,
    private readonly _router: Router
  ) { }

  login(Email: string, Password: string){
    return this._http.post(this.apiUrl, {Email, Password})
  };

  verifyLogin(){
    const token = this._lsService.getItem('token');
    if(token){
      this._router.navigate(['/main/Dashboard']);
    }
  }

  verifyLogout(){
    const token = this._lsService.getItem('token');
    if(!token){
      localStorage.clear();
      this._router.navigate(['/auth/login']);
    }
  }
}
