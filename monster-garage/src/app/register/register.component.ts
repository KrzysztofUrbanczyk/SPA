import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    email: string;
    password: string;

    constructor(public authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
    }

    register() {
        this.authService.signup(this.email, this.password);
        this.email = this.password = '';
        this.router.navigateByUrl('/login');
    }
}
