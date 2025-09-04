import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent{
  itens: string[] = [ 'Dashboard', 'Profiles', 'Reports', 'Logs'];
}