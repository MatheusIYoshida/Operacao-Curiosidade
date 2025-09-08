import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UpdateProfileService } from '../../../services/update-profile.service';
import { FormatDateService } from '../../../services/format-date.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  @ViewChild('activeCheckbox') activeCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild('adminCheckbox') adminCheckbox!: ElementRef<HTMLInputElement>;
  modalForm!: FormGroup;

  constructor(
    private readonly _updateService: UpdateProfileService,
    private readonly _dateService: FormatDateService,
    private readonly _fb: FormBuilder
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
          console.log(response.active);
          this.modalForm.get('active')?.setValue(response.active);
          this.modalForm.get('admin')?.setValue(response.admin);
          this.modalForm.get('name')?.setValue(response.name); 
          this.modalForm.get('birthday')?.setValue(response.birthday 
            ? this._dateService.formatDateInput(response.birthday) : null)
          this.modalForm.get('email')?.setValue(response.email);
          this.modalForm.get('password')?.setValue(response.password);
          this.modalForm.get('address')?.setValue(response.address);
          this.modalForm.get('moreInformations')?.setValue(response.moreInformations);
          this.modalForm.get('interests')?.setValue(response.interests);
          this.modalForm.get('feelings')?.setValue(response.feelings);
          this.modalForm.get('coreValues')?.setValue(response.coreValues);
        },
        error: (error) => console.error('Get profile error', error)
      });
  }
}
