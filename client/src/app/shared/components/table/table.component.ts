import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input({required: true}) thColumns!: string[];
  @Input() users!: any[];

  getUserProperty(user: any, column: string){
    const key = column.toLowerCase();
    const active = 'active';
    if(key == 'status'){
      if(user[key] == 'Incomplete'){
        return 'Pending Review'
      }else{
        return user[active] == true ? 'Complete' : 'Incomplete'
      }
    }
    return user[key] || '';
  }
}
