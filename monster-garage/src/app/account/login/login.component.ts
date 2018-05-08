import { NgModule, Pipe, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ReactiveFormsModule, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  email: FormControl;
  password: FormControl;
  constructor(public authService: AuthService,
    private router: Router) {
  }


  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
  }

  createForm() {
    this.loginform = new FormGroup({
      email: this.email,
      password: this.password
    });
  }


  login() {
    if (this.loginform.valid) {
      this.authService.emailLogin(this.email.value, this.password.value)
        .then(() => {
          this.loginform.reset();
          this.router.navigateByUrl('/pages');
        })
        .catch((ex) => {
          if (ex.code === 'auth/user-not-found') {
            console.log('Błędne dane');
          }
        });
    }
  }
}
