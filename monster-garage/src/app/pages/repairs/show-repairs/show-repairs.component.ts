import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface Repairs {
  customerName: string;
  car: string;
  plates: string;
  comment: string;
  status: string;
  createdAt: string;
  deadline: string;
}

@Component({
  selector: 'app-show-repairs',
  templateUrl: './show-repairs.component.html',
  styleUrls: ['./show-repairs.component.css']
})

export class ShowRepairsComponent implements OnInit {

  repairsCollection: AngularFirestoreCollection<Repairs>;
  repairs: Observable<Repairs[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.repairsCollection = this.afs.collection('repairs');
    this.repairs = this.repairsCollection.valueChanges();
  }

  showToDoRepairs() {
    this.repairsCollection = this.afs.collection('repairs', ref => {
      return ref.where('status', '==', 'Do realizacji');
    });
    this.repairs = this.repairsCollection.valueChanges();
  }

  showDoneRepairs() {
    this.repairsCollection = this.afs.collection('repairs', ref => {
      return ref.where('status', '==', 'Zrealizowane');
    });
    this.repairs = this.repairsCollection.valueChanges();
  }

  showDoingRepairs() {
    this.repairsCollection = this.afs.collection('repairs', ref => {
      return ref.where('status', '==', 'W trakcie');
    });
    this.repairs = this.repairsCollection.valueChanges();
  }

}
