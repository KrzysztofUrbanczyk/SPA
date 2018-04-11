import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'user', component: UserComponent, /*resolve: {data: UserResolver}*/},
    {path: 'login', component: LoginComponent, /*canActivate: [AuthGuard]*/},
    {path: 'register', component: RegisterComponent, /*canActivate: [AuthGuard]*/},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
