import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent{
  itens: string[] = [ 'Dashboard', 'Profiles', 'Reports', 'Logs'];

  constructor(private readonly _router: Router){}

  goToDashboard(){
    this._router.navigate(['/main/Dashboard']);
  }
}