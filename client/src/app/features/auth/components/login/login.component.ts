import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { DecodePayloadService } from '../../../../services/decode-payload.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  accessDenied: boolean = false
  emailMaxLength: number = 200;
  passwordMaxLength: number = 100;
  alertEmail: boolean = false;
  alertPassword: boolean = false;
  spanEmail: string = '';
  spanPassword: string = 'Minimum 6 characters required';

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _route: Router,
    private readonly _payload: DecodePayloadService
  ){}

  ngOnInit(){
    this.loginForm = this._fb.group({
      email: ['', {validators: [Validators.required, Validators.email]}],
      password: ['', {validators: [Validators.required, Validators.minLength(6)]}]
    })
  }

  get email(){
    return this.loginForm.get('email') as FormControl;
  }

  get password(){
    return this.loginForm.get('password') as FormControl
  }

  onFormSubmit(){
    if(this.loginForm.valid){
      const { email, password } = this.loginForm.value;
      this._authService.login(email, password).subscribe({
        next: (response: any) => { 
          const token = response.token;
          this._payload.parseJwt(token);
          localStorage.setItem('token', JSON.stringify(token));
          this._route.navigate(['/main/Dashboard']);
        },
        error: (error) => this.accessDenied = true
      });
    }else{
      if(!this.password.valid){
        this.alertPassword = true;
        this.spanPassword = this.password.hasError('required')
        ? 'Enter your password' : 'Password must be at least 6 characters';
      }
      if(!this.email.valid){
        this.alertEmail = true;
        this.spanEmail = this.email.hasError('required')
        ? 'Enter your email' : 'Invalid email';
      }
    }
  }

  clearInput(event: Event){
    const input = event.target as HTMLInputElement
    if(input.name === 'Email'){
      this.alertEmail = false;
    }else{
      this.spanPassword = 'Minimum 6 characters required';
      this.alertPassword = false;
    }
  }

  goToRegister(){
    this._route.navigate(['/auth/register']);
  }
}
