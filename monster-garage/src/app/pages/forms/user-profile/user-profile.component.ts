import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    user: any;

    private displayName: string;
    constructor(public auth: AuthService,
                public authService: AuthService) {
    }


    ngOnInit() {
        this.auth.user.subscribe((user: any) => this.user = user);
    }
    updateUserData() {
        this.user = {
            displayName: this.displayName
        };
        this.authService.updateUserData(this.user);

    }



}
