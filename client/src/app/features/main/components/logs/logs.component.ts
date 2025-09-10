import { Component, OnInit } from '@angular/core';
import { ListService } from '../../../../services/list.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent implements OnInit{
  mainCardTitle: string = 'Logs';
  currentPage: number = 1;
  pageSize: number = 15;
  filter: string | null = null; 
  thColumns: string[] = ['name', 'email', 'action', 'timestamp'];
  logs: any = [];

  constructor(private readonly _listService: ListService){}

  ngOnInit(){
    this.logsList();
  }

  logsList(){
    let apiUrl = `https://localhost:7160/api/Log?currentPage=${this.currentPage}&pageSize=${this.pageSize}`;
    
    if(this.filter) {
      apiUrl += `&filter=${this.filter}`;
    }

    this._listService.get(apiUrl).subscribe({
      next: (data: any) => {
        const pagination = {
            currentPage: data.currentPage,
            totalPages: data.totalPages,
            hasNext: data.hasNext,
            hasPrevious: data.hasPrevious
          }
          localStorage.setItem("LogsPagination", JSON.stringify(pagination));
          console.log(data.items)
          this.logs = data.items
      },
      error: (error) => console.error('Load logs list error', error)
    })
  }
}
