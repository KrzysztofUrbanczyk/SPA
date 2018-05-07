import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
    this.auth.user.subscribe((user: any) => this.user = user);
  }

  updateData() {
    this.uid = this.user.uid;
    this.email = this.user.email;
    this.photoURL = this.user.photoURL;
    this.user = {
      uid: this.uid,
      email: this.email,
      displayName: this.displayName,
      photoURL: this.photoURL
    };
    this.auth.updateUserData(this.user);
  }

}
