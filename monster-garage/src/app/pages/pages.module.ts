import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RepairsComponent } from './repairs/repairs.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    ThemeModule,
    DashboardModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    RepairsComponent,
  ],
})
export class PagesModule { }
