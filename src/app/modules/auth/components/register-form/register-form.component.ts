import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { CustomValidators } from '@utils/validators';
import { RequestStatus } from '@models/request-status.model';
import { AuthService } from '@services/auth.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  formUser = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  })
  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  status: RequestStatus = 'init';
  statususer: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService : AuthService
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      console.log(name, email, password);
      this.authService.register(email,password,name).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/auth/login']);
        },
        error: () => {
          this.status = 'failed';
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUser(){
    if (this.formUser.valid) {
      this.statususer = 'loading';
      const { email } = this.formUser.getRawValue();
     
      this.authService.isAvailable(email).subscribe({
        next: (resp  : any) => {
          this.statususer = 'success';
          if(resp.isAvalible){
            this.showRegister = true;
            this.form.controls.email.setValue(email);
          }else{
            this.router.navigate(['/auth/login'],{
              queryParams: {email}
            });

          }
        },
        error: () => {
          this.statususer = 'failed';
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }


}
