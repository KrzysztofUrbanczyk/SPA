import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {
}

import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  }
];
