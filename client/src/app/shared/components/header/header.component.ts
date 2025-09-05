import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  profileIcon: string = 'U';
  profileName: string = 'Undefined';

  constructor(private _router: Router){}

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('currentProfile');
    this._router.navigate(['/auth/login']);
  }

  ngOnInit(){
    const currentProfile: any = localStorage.getItem('currentProfile');
    const name = JSON.parse(currentProfile).name
    this.profileIcon = name[0].toUpperCase();
    this.profileName = name;
  }
}
