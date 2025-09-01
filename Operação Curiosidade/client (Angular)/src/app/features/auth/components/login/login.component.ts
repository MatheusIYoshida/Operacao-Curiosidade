import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  emailMaxLength: number = 200;
  passwordMaxLength: number = 100;
  alertEmail: boolean = false;
  alertPassword: boolean = false;
  spanEmailMessage: string = '';
  spanPasMessage: string = 'Minimum 6 characters required';

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService
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
        next: (response) => alert('login success'),
        error: (error) => alert('login error')
      });
    }else{
      if(!this.password.valid){
        this.alertPassword = true;
        this.spanPasMessage = this.password.hasError('required')
        ? 'Enter your password' : 'Password must be at least 6 characters';
      }
      if(!this.email.valid){
        this.alertEmail = true;
        this.spanEmailMessage = this.email.hasError('required')
        ? 'Enter your email' : 'Invalid email';
      }
    }
  }

  clearInput(event: Event){
    const input = event.target as HTMLInputElement
    input.style.border = '2px solid #000';
    if(input.type === 'email'){
      this.alertEmail = false;
    }else{
      const span = input.nextElementSibling as HTMLElement;
      this.spanPasMessage = 'Minimum 6 characters required';
      span.style.color = '#000';
    }
  }
}
