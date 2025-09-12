import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  constructor(
    private readonly _router: Router
  ){}

  verifySearch(){
    if(this._router.url.split("/").pop() == 'Profiles' || 'Logs'){
      return true;
    }
    return false;
  }
}
