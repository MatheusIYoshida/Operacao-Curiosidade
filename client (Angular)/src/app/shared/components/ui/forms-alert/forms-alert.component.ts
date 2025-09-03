import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-forms-alert',
  templateUrl: './forms-alert.component.html',
  styleUrl: './forms-alert.component.scss'
})
export class FormsAlertComponent {
  @Input({alias: 'verifyAcess', required: true }) accessDenied: boolean = false;
  @Output('closeAlert') accessDeniedChange = new EventEmitter<boolean>();
  spanMessage: string = 'Incorrect email or password'

  closeAlert(){
    this.accessDeniedChange.emit(false);
  }
}
