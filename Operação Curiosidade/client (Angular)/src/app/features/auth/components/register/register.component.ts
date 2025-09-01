import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  formTitle: string = 'Create Account';
  spanName: string = '';
  spanEmail: string = '';
  spanPassword: string = '';
  alertName: boolean = false;
  alertEmail: boolean = false;

  constructor(
    private readonly _fb: FormBuilder
  ){}
  
  ngOnInit(){
    this.registerForm = this._fb.group({
      name: ['', {validators: [Validators.required]}],
      email: ['', {validators: [Validators.required, Validators.email]}],
      password: ['', {validators: [Validators.required, Validators.minLength(6)]}]
    })
  }
}
