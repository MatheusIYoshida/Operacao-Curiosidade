import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UpdateProfileService } from '../../../services/update-profile.service';
import { FormatDateService } from '../../../services/format-date.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ChangeNotificationService } from '../../../services/change-notification.service';
import { CreateProfileService } from '../../../services/create-profile.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss'
})
export class FormModalComponent implements OnInit{
  @Input({required: true, alias: 'title'}) modalTitle!: string;
  @Input() submitButtonColor: string = '#429a35';
  @Input() submitButtonText: string = 'Submit'
  @Input() editMode!: boolean;
  @Output() closeModalEmitter = new EventEmitter<boolean>();
  @ViewChild('activeCheckbox') activeCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild('adminCheckbox') adminCheckbox!: ElementRef<HTMLInputElement>;
  modalForm!: FormGroup;
  currentEmail: string = '';

  constructor(
    private readonly _updateService: UpdateProfileService,
    private readonly _createService: CreateProfileService,
    private readonly _dateService: FormatDateService,
    private readonly _fb: FormBuilder,
    private readonly _notificationService: ChangeNotificationService
  ) {}

  ngOnInit(){
    this.modalForm = this._fb.group({
      active: ['', {validators: [Validators.required]}],
      admin: ['', {validators: [Validators.required]}],
      name: ['', {validators: [Validators.required]}],
      birthday: [''],
      email: ['', {validators: [Validators.required, Validators.email]}],
      password: ['', {validators: [Validators.required, Validators.minLength(6)]}],
      address: [''],
      moreInformations: [''],
      interests: [''],
      feelings: [''],
      coreValues: ['']
    });

    if(this.editMode){
      this.fillProfileForm()
    }
  }

  get active(){
    return this.modalForm.get('active');
  }

  get admin(){
    return this.modalForm.get('admin');
  }

  get name(){
    return this.modalForm.get('name');
  }

  get birthday(){
    return this.modalForm.get('birthday');
  }

  get email(){
    return this.modalForm.get('email');
  }

  get password(){
    return this.modalForm.get('password');
  }

  get address(){
    return this.modalForm.get('address');
  }

  get moreInformations(){
    return this.modalForm.get('moreInformations');
  }

  get interests(){
    return this.modalForm.get('interests');
  }

  get feelings(){
    return this.modalForm.get('feelings');
  }

  get coreValues(){
    return this.modalForm.get('coreValues');
  }

  onCloseModal(){
    this.closeModalEmitter.emit(true);
  }

  fillProfileForm(){
    this._updateService.getProfile().subscribe({
        next: (response: any) => {
          this.currentEmail = response.email;
          this.active?.setValue(response.active);
          this.admin?.setValue(response.admin);
          this.name?.setValue(response.name); 
          this.birthday?.setValue(response.birthday 
            ? this._dateService.formatDateInput(response.birthday, true) : null)
          this.email?.setValue(response.email);
          this.password?.setValue(response.password);
          this.address?.setValue(response.address);
          this.moreInformations?.setValue(response.moreInformations);
          this.interests?.setValue(response.interests);
          this.feelings?.setValue(response.feelings);
          this.coreValues?.setValue(response.coreValues);
        },
        error: (error) => console.error('Get profile error', error)
      });
  }

  onFormSubmit(){
    const profile = {
      name: this.name?.value,
      birthday: this.birthday?.value || null,
      email: this.email?.value,
      password: this.password?.value,
      address: this.address?.value,
      moreInformations: this.moreInformations?.value,
      interests: this.interests?.value,
      feelings: this.feelings?.value,
      coreValues: this.coreValues?.value,
      active: this.active?.value || false,
      admin: this.admin?.value || false
    }

    if(this.editMode){
      this._updateService.updateProfile(profile, this.currentEmail).subscribe({
        next: (response) => {
          this.onCloseModal();
        },
        error: (error) => console.error('Update profile error', error)
      });
    }else{
      this._createService.create(profile).subscribe({
        next: (response) => {
          this.onCloseModal();
        },
        error: (error) => console.error('Create profile error', error)
      });
    }
    this._notificationService.emitValue(true);
  }
}
