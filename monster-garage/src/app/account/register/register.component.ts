import { NgModule, Pipe, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform: FormGroup;
  email: FormControl;
  password: FormControl;
  displayName: FormControl;

  constructor(public authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.displayName = new FormControl('', [
      Validators.required,
    ]);
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
    this.registerform = new FormGroup({
      displayName: this.displayName,
      email: this.email,
      password: this.password
    });
  }

  register() {
    if (this.registerform.valid) {
      const photoURL = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png';
      Promise.resolve()
        .then(() => {
          this.authService.signup(this.email.value, this.password.value, this.displayName.value, photoURL);
          this.registerform.reset();
        })
        .then(() => {
          this.authService.emailLogin(String(this.email.value), String(this.password.value));
          this.router.navigateByUrl('/pages');
        });
    }
  }
}
