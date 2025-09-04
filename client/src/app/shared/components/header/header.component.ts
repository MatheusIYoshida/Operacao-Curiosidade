import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  profileIcon: string = 'N';
  profileName: string = 'Name';

  constructor(private _router: Router){}

  logout(){
    this._router.navigate(['/auth/login']);
  }
}
