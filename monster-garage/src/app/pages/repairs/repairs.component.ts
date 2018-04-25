import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { CurrentDateService } from '../../core/current-date.service';
import { Router } from '@angular/router';

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
  private createdAt = new CurrentDateService().getCurrentFormattedDate();
  private deadline: string;

  private repairsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore,
              private router: Router) {
    this.repairsCollection = afs.collection('repairs');
    // this.repairs = this.repairsCollection.valueChanges();
  }

  ngOnInit() {
  }

  addRepair() {
    this.repairsCollection.add({
      customerName: this.customerName,
      car: this.car,
      plates: this.plates,
      comment: this.comment,
      status: 'Do realizacji',
      createdAt: this.createdAt,
      deadline: this.deadline,
    });

    console.log('Dodane!'); // Need to change to some notification alert
    this.router.navigateByUrl('/pages/'); // Need to change after create view of active repairs
  }

}
