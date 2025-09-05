import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  @Input({required: true}) thColumns!: string[];
  @Input() users!: any[];

  ngOnInit(){}

  getUserProperty(user: any, column: string){
    const key = column.toLowerCase();
    return user[key] || '';
  }
}
