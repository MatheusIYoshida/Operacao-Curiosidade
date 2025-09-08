import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UpdateProfileService } from '../../../services/update-profile.service';
import { FormatDateService } from '../../../services/format-date.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss'
})
export class FormModalComponent implements OnInit{
  @Input({required: true, alias: 'title'}) modalTitle!: string;
  @Input() submitButtonColor: string = '#429a35';
  @Input() submitButtonText: string = 'Submit'
  @Input() preLoadInfo!: boolean;
  @Output() closeModalEmitter = new EventEmitter<boolean>();
  activeCheckbox: boolean = true;
  adminCheckbox: boolean = false;
  nameValue: string = "";
  birthdayValue: string | null = null;
  emailValue: string = "";
  passwordValue: string = "";
  addressValue: string = "";
  moreInfoValue: string = "";
  interestsValue: string = "";
  feelingsValue: string = "";
  coreValValue: string = "";

  constructor(
    private _updateService: UpdateProfileService,
    private _dateService: FormatDateService
  ) {}

  ngOnInit(){
    if(this.preLoadInfo){
      this.fillProfileForm()
    }
  }

  onCloseModal(){
    this.closeModalEmitter.emit(true);
  }

  fillProfileForm(){
    this._updateService.getProfile().subscribe({
        next: (response: any) => {
          this.activeCheckbox = response.active;
          this.adminCheckbox = response.admin;
          this.nameValue = response.name;
          this.birthdayValue = response.birthday 
            ? this._dateService.formatDateInput(response.birthday) : null;
          this.emailValue = response.email;
          this.passwordValue = response.password;
          this.addressValue = response.address;
          this.moreInfoValue = response.moreInformations;
          this.interestsValue = response.interests;
          this.feelingsValue = response.feelings;
          this.coreValValue = response.coreValues;
        },
        error: (error) => console.error('Get profile error', error)
      });
  }
}
