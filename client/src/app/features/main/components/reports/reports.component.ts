import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../../services/reports.service';

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

  constructor(private readonly _reportsService: ReportsService) {}

  ngOnInit(){
    this._reportsService.getAllProfiles().subscribe({
      next: (response) => {
        console.log(response)
        this.users = response;
      },
      error: (error) => console.error('Get profiles error', error)
    })
  }

  printOut(){
    window.print();
  }
}
