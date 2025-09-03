import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-back-arrow',
  templateUrl: './go-back-arrow.component.html',
  styleUrl: './go-back-arrow.component.scss'
})
export class GoBackArrowComponent {
  constructor(private _route:Router){}
  
  goBackToLogin(){
    this._route.navigate(['/auth/login']);
  }
}
