import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecodePayloadService {

  constructor() { }

  parseJwt(token: string){
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/, '/');
    const payloadJson = decodeURIComponent(
      atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
    );

    const payload = JSON.parse(payloadJson);
    const currentProfile = {
      name: payload.Name,
      email: payload.Email,
      admin: payload.Admin == 'True' ? true : false
    }
    localStorage.setItem('currentProfile', JSON.stringify(currentProfile));
  }
}
