import { Component, Input } from '@angular/core';
import { ProfileStatusService } from '../../../services/profile-status.service';
import { FormatDateService } from '../../../services/format-date.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input({required: true}) thColumns!: string[];
  @Input() users!: any[];

  constructor(
    private readonly _statusService: ProfileStatusService,
    private readonly _dateService: FormatDateService
  ) {}

  getUserProperty(user: any, column: string){
    const key = column;
    const active = 'active';
    
    if(key == 'status'){
      return this._statusService.verifyStatus(user[key], user[active]);
    }

    if(key == 'createdAt'){
      return this._dateService.formatDateInput(user[key]);
    }

    return user[key] || '';
  }
}
