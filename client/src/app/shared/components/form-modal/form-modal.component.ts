import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UpdateProfileService } from '../../../services/update-profile.service';
import { FormatDateService } from '../../../services/format-date.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeNotificationService } from '../../../services/change-notification.service';
import { CreateProfileService } from '../../../services/create-profile.service';
import { NameValidatorService } from '../../../services/name-validator.service';

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
  @Input() emailToEdit!: string;
  @Output() closeModalEmitter = new EventEmitter<boolean>();
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('activeCheckbox') activeCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild('adminCheckbox') adminCheckbox!: ElementRef<HTMLInputElement>;
  modalForm!: FormGroup;
  currentEmail: string = '';
  spanName: string = '';
  spanEmail: string = '';
  spanPassword: string = 'Minimum 6 characters required';
  alertName: boolean = false;
  alertEmail: boolean = false;
  alertPassword: boolean = false;

  constructor(
    private readonly _updateService: UpdateProfileService,
    private readonly _createService: CreateProfileService,
    private readonly _dateService: FormatDateService,
    private readonly _fb: FormBuilder,
    private readonly _notificationService: ChangeNotificationService,
    private readonly _nameValidator: NameValidatorService
  ) {}

  ngOnInit(){
    this.modalForm = this._fb.group({
      active: [''],
      admin: [''],
      name: ['', {validators: [Validators.required, this._nameValidator.invalidNameValidator()]}],
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
    return this.modalForm.get('active') as FormControl;
  }

  get admin(){
    return this.modalForm.get('admin') as FormControl;
  }

  get name(){
    return this.modalForm.get('name') as FormControl;
  }

  get birthday(){
    return this.modalForm.get('birthday') as FormControl;
  }

  get email(){
    return this.modalForm.get('email') as FormControl;
  }

  get password(){
    return this.modalForm.get('password') as FormControl;
  }

  get address(){
    return this.modalForm.get('address') as FormControl;
  }

  get moreInformations(){
    return this.modalForm.get('moreInformations') as FormControl;
  }

  get interests(){
    return this.modalForm.get('interests') as FormControl;
  }

  get feelings(){
    return this.modalForm.get('feelings') as FormControl;
  }

  get coreValues(){
    return this.modalForm.get('coreValues') as FormControl;
  }

  onCloseModal(){
    this.closeModalEmitter.emit(true);
  }

  clearInput(event: Event){
    const input = event.target as HTMLInputElement;
    switch(input.name){
      case 'Name': this.alertName = false; break;
      case 'Email': this.alertEmail = false; break;
      case 'Password':
        this.alertPassword = false;
        this.spanPassword = 'Minimum 6 characters required';
        break;
    }
  }

  fillProfileForm(){
    this._updateService.getProfile(this.emailToEdit).subscribe({
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
    if(this.modalForm.valid){
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
    }else{
      this.nameInput.nativeElement.scrollIntoView({ block: "center" })
      if(!this.name.valid){
        this.spanName = this.name.hasError('required') 
          ? 'Enter your name' : 'Name invalid'; 
        this.alertName = true;
      }
      if(!this.email.valid){
        this.spanEmail = this.email.hasError('required') 
          ? 'Enter your email' : 'Email invalid';
        this.alertEmail = true;
      }
      if(!this.password.valid){
        this.spanPassword = this.password.hasError('required') 
          ? 'Enter your password' : 'Password must be at least 6 characters'
        this.alertPassword = true
      }
    }
  }
}