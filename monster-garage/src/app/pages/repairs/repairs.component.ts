import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styles: []
})

export class RepairsComponent implements OnInit {
  private customerName: string;
  private car: string;
  private plates: string;
  private comment: string;
  private createdAt = new Date();
  private deadline: string;

  private repairsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.repairsCollection = afs.collection('repairs');
    // this.repairs = this.repairsCollection.valueChanges();
  }

  ngOnInit() {
  }

  addRepair() {
    console.log('Dodane!');
    return this.repairsCollection.add({
      customerName: this.customerName,
      car: this.car,
      plates: this.plates,
      comment: this.comment,
      status: 'Do realizacji',
      createdAt: this.createdAt,
      deadline: this.deadline,
    });
  }

}
