import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;

    constructor(public auth: AuthService,
                private router: Router) {
    }

    ngOnInit() {
    }

    login() {
        if (this.email === 'root' && this.password === 'root') {
            this.router.navigate(['user']);
        } else {
            alert('Nie istnieje taki użytkownik');
        }
    }
}
