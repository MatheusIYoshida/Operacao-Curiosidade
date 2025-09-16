import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileStatusService {
  verifyStatus(user: any, column: string, td: HTMLTableCellElement){
    if(column == 'status'){
      switch (user[column]){
        case 'Incomplete':
          td.style.color = '#B22222';
          return 'Pending Review';
        case 'Complete':
          switch (user['active']){
            case true:
              return 'Active'
            case false:
              td.style.color = '#898989'
              return 'Inactive'
          }  
      }
    }

    return user[column];
  }
}