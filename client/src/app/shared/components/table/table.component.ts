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
    if(column == 'createdAt'){
      return this._dateService.formatDateInput(user[column], true);
    }else if(column == 'timestamp'){
      return this._dateService.formatDateInput(user['createdAt'], false);
    }

    return this._statusService.verifyStatus(user, column) || '';
  }
}
