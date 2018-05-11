import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { ToastrController } from 'ng2-toastr-notifications';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  email: FormControl;

  public loading = false;

  constructor(public authService: AuthService,
              private router: Router,
              private toastCtrl: ToastrController,
              private location: Location) {
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  goBack() {
    this.location.back();
  }


  createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9]+[.]{1}[a-z]{2,4}$')
    ]);

  }

  createForm() {
    this.resetForm = new FormGroup({
      email: this.email,
    });
  }

  reset() {
    if (this.resetForm.valid) {
      this.loading = true;
      this.authService.resetPassword(this.email.value)
        .then(() => {
          this.toastCtrl.show({
            type: 'success',
            title: 'Sukces',
            message: 'Hasło zostało zresetowane!'
          });
          this.router.navigateByUrl('/pages');
        })
        .catch((ex) => {
          this.loading = false;
          if (ex.code === 'auth/user-not-found') {
            this.toastCtrl.show({type: 'error', title: 'Uwaga!', message: 'Podany adres Email nie istnieje!'});
          } else {
            this.toastCtrl.show({type: 'error', title: 'Uwaga!', message: 'Coś poszło nie tak!'});
          }
        });
    }
  }
}
