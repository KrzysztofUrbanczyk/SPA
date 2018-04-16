import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, AfterViewInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  ngAfterViewInit() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }


  ngOnInit() {
  }

}
