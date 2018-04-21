import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  displayName: string;

  constructor(public authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {

  }

  login() {
    this.authService.emailLogin(this.email, this.password);
    this.email = this.password = '';
    setTimeout(() => this.router.navigateByUrl('/pages'), 2000);
  }
}
