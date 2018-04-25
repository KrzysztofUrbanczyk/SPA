import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Repairs } from './repairs';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styles: []
})

export class RepairsComponent implements OnInit {
  private repairsCollection: AngularFirestoreCollection<Repairs>;
  repairs: Observable<Repairs[]>;

  constructor(private afs: AngularFirestore) {
    this.repairsCollection = afs.collection<Repairs>('repairs');
    this.repairs = this.repairsCollection.valueChanges();
  }

  ngOnInit() {
  }

  private addRepair(repair) {
    this.repairsCollection.add(repair);
    console.log('Dodane!');
  }
}
