import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss'
})
export class FormModalComponent {
  @Input({required: true, alias: 'title'}) modalTitle!: string;
  @Input() submitButtonColor: string = '#429a35';
  @Input() submitButtonText: string = 'Submit'
  @Output() closeModalEmitter = new EventEmitter<boolean>();

  onCloseModal(){
    this.closeModalEmitter.emit(true);
  }
}
