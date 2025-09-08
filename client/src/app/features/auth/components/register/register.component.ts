import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateProfileService } from '../../../../services/create-profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  formTitle: string = 'Create Account';
  nameMaxLength: number = 100;
  emailMaxLength: number = 200;
  passwordMaxLength: number = 100;
  spanName: string = '';
  spanEmail: string = '';
  spanPassword: string = 'Minimum 6 characters required';
  alertName: boolean = false;
  alertEmail: boolean = false;
  alertPassword: boolean = false;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _createService: CreateProfileService,
    private readonly _route: Router
  ){}
  
  ngOnInit(){
    this.registerForm = this._fb.group({
      name: ['', {validators: [Validators.required]}],
      email: ['', {validators: [Validators.required, Validators.email]}],
      password: ['', {validators: [Validators.required, Validators.minLength(6)]}]
    })
  }

  get name(){
    return this.registerForm.get('name') as FormControl;
  }

  get email(){
    return this.registerForm.get('email') as FormControl;
  }

  get password(){
    return this.registerForm.get('password') as FormControl;
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

  onFormSubmit(){
    if(this.registerForm.valid){
      const {name, email, password} = this.registerForm.value;
      this._createService.create(name, email, password).subscribe({
        next: (response) => this._route.navigate(['/auth/login']),
        error: (error) => {
          if(error.error.errors.includes('Email already exists')){
            this.alertEmail = true;
            this.spanEmail = 'Email already exists';
          }else{
            console.error('Login error', error);
          }
        }
      });
    }else{
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
