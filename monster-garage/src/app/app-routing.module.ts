import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'user', component: UserComponent, /*resolve: {data: UserResolver}*/},
  {path: 'login', component: LoginComponent, /*canActivate: [AuthGuard]*/},
  {path: 'register', component: RegisterComponent, /*canActivate: [AuthGuard]*/},
  {path: 'dashboard', component: DashboardComponent, /*canActivate: [AuthGuard]*/},
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
