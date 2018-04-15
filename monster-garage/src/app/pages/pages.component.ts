import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  template: `
    <app-layout-one-column>
    <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-layout-one-column>
    `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
