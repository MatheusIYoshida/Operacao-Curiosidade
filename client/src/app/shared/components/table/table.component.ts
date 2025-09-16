import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileStatusService } from '../../../services/profile-status.service';
import { FormatDateService } from '../../../services/format-date.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input({required: true}) thColumns!: string[];
  @Input() hasActions: boolean = false;
  @Input() users!: any[];
  @Output() clickEditBtn = new EventEmitter<string>();
  @Output() clickRemoveBtn = new EventEmitter<string>();
  disabled: boolean = true;

  constructor(
    private readonly _statusService: ProfileStatusService,
    private readonly _dateService: FormatDateService,
    private readonly _lsService: LocalStorageService
  ) {}

  getUserProperty(user: any, column: string, tableItem: HTMLTableCellElement){
    if(column == 'createdAt'){
      return this._dateService.formatDateInput(user[column], true);
    }else if(column == 'timestamp'){
      return this._dateService.formatDateInput(user['createdAt'], false);
    }

    return this._statusService.verifyStatus(user, column, tableItem) || '';
  }

  openEditModal(index: number){
    this.clickEditBtn.emit(this.users[index].email);
  }

  openRemoveModal(index:number){
    this.clickRemoveBtn.emit(this.users[index].email);
  }

  disableButton(tableRow: HTMLTableRowElement){
    const currentProfile = this._lsService.getItem('currentProfile')
    if(this.removeAllSpaces(tableRow.cells[1].textContent) == currentProfile.email || currentProfile.admin == true){
      return false
    }
    return true;
  }

  removeAllSpaces(str: string | null){
    return str?.replace(/\s/g, '');
  }
}
