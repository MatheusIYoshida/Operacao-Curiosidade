import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ProfileStatusService } from '../../../services/profile-status.service';
import { FormatDateService } from '../../../services/format-date.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @ViewChild('tableItem') tableItem!: ElementRef<HTMLTableCellElement>; 
  @Input({required: true}) thColumns!: string[];
  @Input() hasActions: boolean = false;
  @Input() users!: any[];
  @Output() clickEditBtn = new EventEmitter<string>();
  @Output() clickRemoveBtn = new EventEmitter<string>();

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

  openEditModal(index: number){
    this.clickEditBtn.emit(this.users[index].email);
  }

  openRemoveModal(index:number){
    this.clickRemoveBtn.emit(this.users[index].email);
  }
}
