import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileStatusService {
  verifyStatus(status: string, active: boolean){
    return status == 'Incomplete' ? 'Pending Review' : 
      (active == true) ? 'Complete' : 'Incomplete';
  }
}
