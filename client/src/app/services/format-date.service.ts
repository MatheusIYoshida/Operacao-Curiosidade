import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatDateService {
  formatDateInput(dateString: string, shorter: boolean){
    const dateFormated = dateString.split('T');
    const hourFormated = dateFormated[1].split('.');
    return shorter == true ? dateFormated[0] : `${hourFormated[0]} - ${dateFormated[0]}`;
  }
}
