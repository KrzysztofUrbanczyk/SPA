import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Repairs } from './repairs';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-repairs',
  template: '',
  styles: []
})

export class RepairsComponent implements OnInit {
  repairs: Observable<Repairs[]>;
  private repairsCollection: AngularFirestoreCollection<Repairs>;

  constructor(private afs: AngularFirestore) {
    this.repairsCollection = afs.collection<Repairs>('repairs');
    this.repairs = this.repairsCollection.valueChanges();
  }

  ngOnInit() {
  }

}
