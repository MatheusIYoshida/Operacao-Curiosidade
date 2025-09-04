import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  mainCardTitle: string = 'Lastest 15 Registrations';
  panelOneTitle: string = 'Total Registrations';
  panelTwoTitle: string = 'Last 30-Day Registrations';
  panelThreeTitle: string = 'Pending Review';
  panelOneColor: string = '#415996';
  panelTwoColor: string = '#2EFF2E';
  panelThreeColor: string = '#FF5555';
}
