import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../../services/reports.service';
import { ChangeNotificationService } from '../../../../services/change-notification.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit{
  mainCardTitle: string = 'Reports';
  openPrintOut: boolean = false;
  thColumns: string[] = ['name', 'email', 'status', 'createdAt'];
  users: any = [];

  constructor(
    private readonly _reportsService: ReportsService,
    private readonly _notificationService: ChangeNotificationService,
    private readonly _authService: AuthService
  ) {}

  ngOnInit(){
    this._authService.verifyLogout();
    this.getProfiles();
    this._notificationService.valueChanged().subscribe(() => {
      this.getProfiles();
    })
  }

  getProfiles(){
    this._reportsService.getAllProfiles().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => console.error('Get profiles error', error)
    });
  }

  printOut(){
    window.print();
  }
}
