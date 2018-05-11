import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RepairsComponent } from './repairs/repairs.component';
import { ShowRepairsComponent } from './repairs/show-repairs/show-repairs.component';
import { ClientListComponent } from './client/client-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ClientListService } from './client/client-list.service';
import { ShowRepairsService } from './repairs/show-repairs/show-repairs.service';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    RepairsComponent,
    ShowRepairsComponent,
    ClientListComponent
  ],
  providers: [
    ClientListService,
    ShowRepairsService,
  ]
})
export class PagesModule {
}
