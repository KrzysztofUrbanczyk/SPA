import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService, NbContextMenuModule } from '@nebular/theme';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: any;

  userMenu = [{ title: 'Profil', link: '/pages/forms/profile' }, { title: 'Wyloguj', link: '/logout' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private auth: AuthService ) {
  }

  ngOnInit() {
    this.auth.user.subscribe((user: any) => this.user = user);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }
}
