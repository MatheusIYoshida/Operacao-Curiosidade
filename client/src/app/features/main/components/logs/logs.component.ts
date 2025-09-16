import { Component, OnInit } from '@angular/core';
import { ListService } from '../../../../services/list.service';
import { ChangeNotificationService } from '../../../../services/change-notification.service';
import { PageNotifyService } from '../../../../services/page-notify.service';
import { AuthService } from '../../../../services/auth.service';

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

  constructor(
    private readonly _listService: ListService,
    private readonly _notificationService: ChangeNotificationService,
    private readonly _pageNotifyService: PageNotifyService,
    private readonly _authService: AuthService
  ){}

  ngOnInit(){
    this._authService.verifyLogout();
    this.logsList();
    this._notificationService.valueChanged().subscribe((response: string | null) => {
      this.filter = response;
      this.currentPage = 1;
      this._pageNotifyService.emitValue(1);
      
      setTimeout(() => {
        this.logsList();
      }, 250);
    });
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
          localStorage.setItem("logsPagination", JSON.stringify(pagination));
          this.logs = data.items
      },
      error: (error) => console.error('Load logs list error', error)
    })
  }

  setCurrentPage(currentPage: number){
    this.currentPage = currentPage;
    this.logsList();
  }
}
