import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth.service';
import {NotifyService} from '../../core/notify.service';

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


    constructor(public authService: AuthService,
                private router: Router,
                public notify: NotifyService) {
    }

    ngOnInit() {
    }

    register() {
        this.photoURL = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png';
        this.authService.signup(this.email, this.password, this.displayName, this.photoURL);
        this.email = this.password = this.displayName = this.photoURL = '';
        setTimeout((router: Router) => {
          this.router.navigate(['login']);
        }, 5000);
    }

    clearMsg() {
        // this.msg = this.notify.clear();
    }
}