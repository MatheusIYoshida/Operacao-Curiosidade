import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileStatusService {
  verifyStatus(user: any, column: string){
    if(column == 'status'){
      return user[column] == 'Incomplete' ? 'Pending Review' : 
        (user['active'] == true) ? 'Active' : 'Inactive';
    }

    return user[column];
  }
}
