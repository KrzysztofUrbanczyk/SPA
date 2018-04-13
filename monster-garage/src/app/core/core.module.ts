import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { NotifyService } from './notify.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  declarations: [],
  providers: [
    AuthService,
    NotifyService
  ]
})
export class CoreModule {
}
