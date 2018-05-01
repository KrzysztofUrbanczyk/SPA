import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RepairsComponent } from './repairs/repairs.component';
import { ShowRepairsComponent } from './repairs/show-repairs/show-repairs.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'forms',
      loadChildren: './forms/forms.module#FormsModule',
    },
    {
      path: 'repairs',
      component: RepairsComponent,
    },
    {
      path: 'show-repairs',
      component: ShowRepairsComponent
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
