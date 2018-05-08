import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrController } from 'ng2-toastr-notifications';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  editForm: FormGroup;
  displayName: FormControl;
  email: FormControl;
  photoURL: string;
  uid: string;

  constructor(public auth: AuthService,
              private toastCtrl: ToastrController) {
  }

  ngOnInit() {
    this.auth.user.subscribe((user: any) => this.user = user);
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.displayName = new FormControl('', [
      Validators.minLength(3)
    ]);
  }

  createForm() {
    this.editForm = new FormGroup({
      displayName: this.displayName,
    });
  }

  updateData() {
    if (this.editForm.valid) {
      this.uid = this.user.uid;
      this.email = this.user.email;
      this.photoURL = this.user.photoURL;
      this.user = {
        uid: this.uid,
        email: this.email,
        displayName: this.displayName.value,
        photoURL: this.photoURL
      };
      this.auth.updateUserData(this.user);
      this.toastCtrl.show({
        type: 'success',
        title: 'Sukces',
        message: 'Dokonano aktualizacji danych'
      });
    }
  }

}
