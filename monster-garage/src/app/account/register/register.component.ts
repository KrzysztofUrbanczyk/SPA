import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  displayName: string;
  photoURL: string;
  msg: string;

  constructor(public authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.photoURL = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png';
    this.authService.signup(this.email, this.password, this.displayName, this.photoURL);
    this.email = this.password = this.displayName = this.photoURL = '';
    this.msg = 'Rejestracja przebiegła pomyślnie';
    setTimeout((router: Router) => {
      this.router.navigate(['login']);
    }, 2000);
  }
}
