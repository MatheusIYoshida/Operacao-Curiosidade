import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  mainCardTitle: string = 'Lastest 15 Registrations';
  panelOneTitle: string = 'Total Registrations';
  panelTwoTitle: string = 'Last 30-Day Registrations';
  panelThreeTitle: string = 'Pending Review';
  panelOneColor: string = '#415996';
  panelTwoColor: string = '#2EFF2E';
  panelThreeColor: string = '#FF5555';
  thColumns: string[] = ['Name', 'Email', 'Status'];
  users: any = [];

  constructor(private _dashboardService: DashboardService){}

  ngOnInit(){
    this._dashboardService.get('https://localhost:7160/api/Dashboard/recent-profiles')
      .subscribe({
        next: (data) => this.users = data,
        error: (error) => console.error('Load users error')
      })

  }
}