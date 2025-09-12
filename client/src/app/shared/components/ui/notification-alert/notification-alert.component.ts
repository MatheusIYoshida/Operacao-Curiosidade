import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AlertNotificationService } from '../../../../services/alert-notification.service';

@Component({
  selector: 'app-notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrl: './notification-alert.component.scss'
})
export class NotificationAlertComponent implements OnInit{
  @ViewChild('divAlert') alert!: ElementRef<HTMLDivElement>; 
  message!: string;
  

  constructor(
    private readonly _alertService: AlertNotificationService
  ){}

  ngOnInit(){
    this._alertService.valueChanged().subscribe((response) => {
      this.message = response;
      this.alert.nativeElement.classList.remove("hide");
      setTimeout(() => {
        this.alert.nativeElement.classList.add("hide");
      }, 5000);
    })
  }
}
