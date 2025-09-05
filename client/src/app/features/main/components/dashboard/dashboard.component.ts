import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard.service';
import { LocalStorageService } from '../../../../services/local-storage.service';

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
  panelOneInfo: any = 0;
  panelTwoInfo: any = 0;
  panelThreeInfo: any = 0;
  thColumns: string[] = ['Name', 'Email', 'Status'];
  users: any = [];

  constructor(private _dashboardService: DashboardService){}

  ngOnInit(){
    this._dashboardService.get('https://localhost:7160/api/Dashboard/recent-profiles')
      .subscribe({
        next: (data) => this.users = data,
        error: (error) => console.error('Load profiles error')
      })

    this._dashboardService.get('https://localhost:7160/api/Dashboard/total-profiles')
      .subscribe({
        next: (data) => this.panelOneInfo = data,
        error: (error) => console.error('Get total profiles error') 
      })

    this._dashboardService.get('https://localhost:7160/api/Dashboard/last-profiles')
      .subscribe({
        next: (data) => this.panelTwoInfo = data,
        error: (error) => console.error('Get last profiles error')
      })

    this._dashboardService.get('https://localhost:7160/api/Dashboard/pending-profiles')
      .subscribe({
        next: (data) => this.panelThreeInfo = data,
        error: (error) => console.error('Get last profile error')
      })
  }
}