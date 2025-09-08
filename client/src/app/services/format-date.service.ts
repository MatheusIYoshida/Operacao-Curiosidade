import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatDateService {
  formatDateInput(dateString: string){
    const dateFormated = dateString.split('T');
    return dateFormated[0];
  }
}
