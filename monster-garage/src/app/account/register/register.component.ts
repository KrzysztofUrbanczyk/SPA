import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrController } from 'ng2-toastr-notifications';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  email: FormControl;
  password: FormControl;
  displayName: FormControl;

  constructor(public authService: AuthService,
              private router: Router,
              private toastCtrl: ToastrController) {
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
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9]+[.]{1}[a-z]{2,4}$')
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
  }

  createForm() {
    this.registerForm = new FormGroup({
      displayName: this.displayName,
      email: this.email,
      password: this.password
    });
  }

  register() {
    if (this.registerForm.valid) {
      const photoURL = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png';

      this.authService.signup(this.email.value, this.password.value, this.displayName.value, photoURL)
        .then(() => {
          this.authService.emailLogin(String(this.email.value), String(this.password.value));
          this.toastCtrl.show({
            type: 'success',
            title: 'Sukces',
            message: 'Udało się! Zostałeś automatycznie zalogowany'
          });
          this.router.navigateByUrl('/pages');
        });
    }
  }
}
